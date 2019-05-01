import { Component } from 'preact';
import { AppBar, Button, Icon } from 'preact-fluid';

import LoginModal from '../Login';
import Loader from '../Loader';

import { withStore, actions } from '../../utils/store';
import Firebase from '../../utils/firebase';

const RightSection = ({ isLogged, onClick }) => (
	<Button secondary onClick={onClick}>
		{isLogged ? 'Log Out' : 'Log In'}
	</Button>
);

const TitleSection = ({ openSidenav }) => (
	<div onClick={openSidenav} style={styles.titleWrapper}>
		<Icon
			name="bars"
			size="small"
		/>
		<span style={styles.title}>Eventerio</span>
	</div>
);
	
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
			<div>
				<AppBar
					primary
					leftSection={<TitleSection openSidenav={openSidenav} />}
					rightSection={
						<RightSection
							isLogged={user}
							onClick={user ? this.handleLogOut : this.showLoginModal}
						/>
					}
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
	title: {
		fontSize: '24px',
		marginLeft: '10px'
	},
	titleWrapper: {
		cursor: 'pointer'
	}
};

export default withStore(Header);
