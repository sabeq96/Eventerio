import firebase from 'firebase';

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
}

export default new Firebase();
