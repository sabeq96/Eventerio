import firebase from 'firebase';
import { actions } from './store';
import errorMessages from '../constants/errorMessages';

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

	updateUser = ({ avatarUrl, city, name, surname, email, settings }) => {
		const user = this.auth.currentUser;
		if (user) {
			const userPath = `users/${user.uid}`;
			const updates = {};
			if (avatarUrl) updates[userPath + '/avatarUrl'] = avatarUrl;
			if (city) updates[userPath + '/city'] = city;
			if (name) updates[userPath + '/name'] = name;
			if (surname) updates[userPath + '/surname'] = surname;
			if (email) updates[userPath + '/email'] = email;
			if (settings.eventsMaxDistance)
				updates[userPath + '/settings/eventsMaxDistance'] = settings.eventsMaxDistance;

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

	setEvent = ({ address, contactDetails, date = {}, description, name, shortDescription }) => {
		const key = this.db.ref().child('events').push().key;
		const user = this.auth.currentUser.uid;

		return this.db.ref('events/' + key).set({
			ownerId: user,
			address: address || '',
			contactDetails: contactDetails || '',
			date: {
				startDate: date.startDate || new Date(),
				endDate: date.endDate || new Date()
			},
			description: description || '',
			name: name || '',
			shortDescription: shortDescription || ''
		});
	}

	updateEvent = ({ id, address, contactDetails, date, description, name, shortDescription }) => {
		const user = this.auth.currentUser;
		const eventId = id || this.db.ref().child('events').push().key;
		const eventPath = `events/${eventId}`;
		const updates = {};

		updates[eventPath + '/ownerId'] = user.uid;

		if (address) updates[eventPath + '/address'] = address;
		if (contactDetails) updates[eventPath + '/contactDetails'] = contactDetails;
		if (date) {
			if (date.startDate) updates[eventPath + '/date/startDate'] = date.startDate;
			if (date.endDate) updates[eventPath + '/date/endDate'] = date.endDate;
		}
		if (description) updates[eventPath + '/description'] = description;
		if (name) updates[eventPath + '/name'] = name;
		if (shortDescription) updates[eventPath + '/shortDescription'] = shortDescription;

		return this.db.ref().update(updates);
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

	uploadFile(file) {
		const filename = new Date().getTime().toString();
		const imageRef = this.storage.ref().child(filename);

		return imageRef.put(file);
	}

}

export default new Firebase();
