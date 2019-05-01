import firebase from 'firebase';
import { actions } from './store';

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
		this.users = firebase.firestore().collection('users');
	}

	createUser = (email, password) => (
		this.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
	)

	logIn = (email, password) => (
		this.auth.signInWithEmailAndPassword(email, password)
	)

	logOut = () => (
		this.auth.signOut()
	)

	updatePassword = (password) => (
		this.auth.currentUser.updatePassword(password)
	)

	getUser = () => (
		this.auth.currentUser
	)

	// TIP: this method handle all login status change and should also update store with user data
	startLoginObserver = (dispatch) => (
		this.auth.onAuthStateChanged((user) => {
			if (user) dispatch({ type: actions.LOGIN, user });
			else dispatch({ type: actions.LOGOUT });
		})
	)

}

export default new Firebase();
