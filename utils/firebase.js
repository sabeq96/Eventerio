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
