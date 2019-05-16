import { Component } from 'preact';

import LoginModal from '../../components/Login';
import Loader from '../../components/Loader';
import AppBar from './AppBar';

import { withStore, actions } from '../../utils/store';
import Firebase from '../../utils/firebase';
	
class Header extends Component {
	handleLogOut = () => {
		Firebase.logOut();
	}

	showLoginModal = () => {
		const { dispatch } = this.props;
		dispatch({ type: actions.SHOW_LOGIN_MODAL, modalType: 'LOGIN' });
	}

	constructor(props) {
		super(props);

		this.loginModal;
		Firebase.startLoginObserver(props.dispatch);
	}
	
	render({ openSidenav, store: { user, showLoader, modalType } }) {
		return (
			<div style={styles.wrapper}>
				<AppBar
					openSidenav={openSidenav}
					user={user}
					handleLogOut={this.handleLogOut}
					showLoginModal={this.showLoginModal}
				/>
				{modalType && (
					<LoginModal />
				)}
				{showLoader && (
					<Loader />
				)}
			</div>
		);
	}
}

const styles = {
	wrapper: {
		position: 'fixed',
		top: 0,
		zIndex: 100,
		width: '100%'
	}
};

export default withStore(Header);
