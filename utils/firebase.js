import firebase from 'firebase';
import { actions } from './store';
import errorMessages from '../constants/errorMessages';

import _forEach from 'lodash/foreach';

const config = {
	apiKey: 'AIzaSyDITmSuTTlBzt9j2rv0Dra0GE2zTcE9qdk',
	authDomain: 'pwa-test-10466.firebaseapp.com',
	databaseURL: 'https://pwa-test-10466.firebaseio.com',
	projectId: 'pwa-test-10466',
	storageBucket: 'pwa-test-10466.appspot.com',
	messagingSenderId: '1079408955411'
};

class Firebase {
	constructor() {
		firebase.initializeApp(config);
		this.auth = firebase.auth();
		this.db = firebase.database();
		this.storage = firebase.storage();
	}

	createUser = (email, password) => (
		this.auth.createUserWithEmailAndPassword(email, password)
			.then(() => {
				const user = this.auth.currentUser;
				if (user) {
					this.setUserData(user.uid, { email: user.email }).then(() => (
						Promise.resolve({ email: user.email })
					)).catch(() => (
						Promise.reject({ message: errorMessages.userDataNotSetted })
					));
				}
			})
			.catch((error) => (
				Promise.reject(error)
			))
	)

	setUserData = (id, { avatarUrl, city, comments, events, name, surname, email, settings }) => (
		this.db.ref('users/' + id).set({
			avatarUrl: avatarUrl || '',
			city: city || '',
			comments: comments || [],
			events: events || [],
			name: name || '',
			surname: surname || '',
			email: email || '',
			settings: {
				eventsMaxDistance: (settings && settings.eventsMaxDistance) || 30
			}
		})
	);

	getEvent(id) {
		return this.db.ref(`/events/${id}`).once('value').then((snapshot) => (
			Promise.resolve(snapshot.val())
		)).catch(() => (
			Promise.reject({ message: errorMessages.eventNotFound })
		));
	}

	getEvents() {
		return this.db.ref(`/events`).once('value').then((snapshot) => (
			Promise.resolve(snapshot.val())
		)).catch((error) => (
			Promise.reject({ message: error.message })
		));
	}

	getEventOrganizer(id) {
		return this.db.ref(`/users/${id}`).once('value').then((snapshot) => (
			Promise.resolve(snapshot.val())
		)).catch(() => (
			Promise.reject({ message: errorMessages.userNotFound })
		));
	}

	getUser = () => {
		const user = this.auth.currentUser;
		if (user) {
			return this.db.ref('users/' + user.uid).once('value').then((snapshot) => (
				Promise.resolve(snapshot.val())
			)).catch(() => (
				Promise.reject({ message: errorMessages.userNotFound })
			));
		}
	}

	updateUser = ({ avatarUrl, city, name, surname, email, settings, ownEventId }) => {
		const user = this.auth.currentUser;
		if (user) {
			const userPath = `users/${user.uid}`;
			const updates = {};
			if (avatarUrl) updates[userPath + '/avatarUrl'] = avatarUrl;
			if (city) updates[userPath + '/city'] = city;
			if (name) updates[userPath + '/name'] = name;
			if (surname) updates[userPath + '/surname'] = surname;
			if (email) updates[userPath + '/email'] = email;
			if (settings && settings.eventsMaxDistance)
				updates[userPath + '/settings/eventsMaxDistance'] = settings.eventsMaxDistance;


			// id ownEventId passed and exist in db => delete it
			// id ownEventId passed and doesn't exist => add it
			if (ownEventId) {
				this.db.ref(userPath + '/ownEvents').once('value').then((snapshot) => {
					snapshot.val() && snapshot.val()[ownEventId] ?
						this.db.ref(userPath + '/ownEvents/' + ownEventId).remove()
						: this.db.ref(userPath + '/ownEvents/').child(ownEventId).set(true);
				});
			}

			return this.db.ref().update(updates);
		}
	}

	logIn = (email, password) => (
		this.auth.signInWithEmailAndPassword(email, password)
	)

	logOut = () => (
		this.auth.signOut()
	)

	updatePassword = (password) => (
		this.auth.currentUser.updatePassword(password)
	)

	getEventList = () => (
		this.db.ref('events/').once('value').then((snapshot) => (
			Promise.resolve(snapshot.val())
		)).catch((err) => (
			Promise.reject(err)
		))
	)

	getOwnEventList = () => (
		this.getUser().then((user) => {
			const { ownEvents } = user;

			return this.getEventList().then((list) => {
				const events = {};
				_forEach(ownEvents, (ownEvent, key) => (
					events[key] = list[key] || {}
				));

				return Promise.resolve(events);
			}).catch((err) => Promise.reject(err));
		}).catch((err) => Promise.reject(err))
	)
	// if id passed update event
	// if no id, autogenerate and add to ownEvents auto
	updateEvent = ({ id, address, contactDetails, startTime, endTime, description, name, shortDescription, photoUrl }) => {
		const user = this.auth.currentUser;
		const eventId = id || this.db.ref().child('events').push().key;
		const eventPath = `events/${eventId}`;
		const updates = {};

		updates[eventPath + '/ownerId'] = user.uid;

		if (address) updates[eventPath + '/address'] = address;
		if (contactDetails) updates[eventPath + '/contactDetails'] = contactDetails;
		if (startTime) updates[eventPath + '/startTime'] = new Date(startTime[0]).getTime();
		if (endTime) updates[eventPath + '/endTime'] = new Date(endTime[0]).getTime();
		if (description) updates[eventPath + '/description'] = description;
		if (name) updates[eventPath + '/name'] = name;
		if (shortDescription) updates[eventPath + '/shortDescription'] = shortDescription;
		if (photoUrl) updates[eventPath + '/photoUrl'] = photoUrl;

		if (!id) {
			this.updateUser({ ownEventId: eventId }).then(() => {
				// push to list
			}).catch((err) => {console.log(err);});
		}

		return this.db.ref().update(updates);
	}

	deleteEvent = (ownEventId) => (
		this.updateUser({ ownEventId })
	);
	
	reauthenticateUser = (password) => {
		const user = this.auth.currentUser;
		const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);

		return user.reauthenticateAndRetrieveDataWithCredential(credential);
	}

	// TIP: this method handle all login status change and should also update store with user data
	startLoginObserver = (dispatch) => {
		this.auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch({ type: actions.SHOW_LOADER, showLoader: true });
				this.getUser().then((userData) => {
					dispatch({ type: actions.LOGIN, user: userData });
				}).catch((error) => {
					console.log(error);
				}).finally(() => {
					dispatch({ type: actions.SHOW_LOADER, showLoader: false });
				});
			}
			else dispatch({ type: actions.LOGOUT });
		});
	}

	uploadFile(file, directory) {
		const filename = new Date().getTime().toString();
		const imageRef = this.storage.ref(directory).child(filename);

		return imageRef.put(file);
	}

}

export default new Firebase();
