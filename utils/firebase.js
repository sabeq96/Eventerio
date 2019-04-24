import firebase from 'firebase';
import { cloneElement, Component } from 'preact';

const config = {
	apiKey: 'AIzaSyDITmSuTTlBzt9j2rv0Dra0GE2zTcE9qdk',
	authDomain: 'pwa-test-10466.firebaseapp.com',
	databaseURL: 'https://pwa-test-10466.firebaseio.com',
	projectId: 'pwa-test-10466',
	storageBucket: 'pwa-test-10466.appspot.com',
	messagingSenderId: '1079408955411'
};

class Firebase extends Component{
	createUser = (email, password) => (
		this.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
	)

	logIn = (email, password) => {
		const { dispatch } = this.props;

		dispatch({ type: 'SHOW_LOADER', showLoader: true });
		return (
			this.auth.signInWithEmailAndPassword(email, password)
				.then((response) => Promise.resolve(response))
				.catch((error) => Promise.reject(error))
				.finally(() => {
					dispatch({ type: 'SHOW_LOADER', showLoader: false });
				})
		);
	}

	logOut = () => (
		this.auth.signOut()
	)

	updatePassword = (password) => (
		this.auth.currentUser.updatePassword(password)
	)

	constructor(props) {
		super(props);
		firebase.initializeApp(config);

		this.auth = firebase.auth();
	}

	render({ children }) {
		return (
			cloneElement(
				children[0],
				{ Firebase: {
					logIn: this.logIn,
					logOut: this.logOut,
					createUser: this.createUser,
					updatePassword: this.updatePassword
				} }
			)
		);
	}
}

export default Firebase;
