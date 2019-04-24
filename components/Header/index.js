import { Component } from 'preact';
import { AppBar, Button, Icon } from 'preact-fluid';

import LoginModal from '../Login';
import Loader from '../Loader';

import { withStore } from '../../utils/store';

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
	handleLogin = ({ email, password }) => {
		const { dispatch, Firebase } = this.props;

		return Firebase.logIn(email, password).then(() => {
			dispatch({ type: 'LOGIN' });
		}).catch((error) => (
			Promise.reject(error)
		));
	}

	handleLogOut = () => {
		const { dispatch, Firebase } = this.props;

		return Firebase.logOut().then(() => {
			dispatch({ type: 'LOGOUT' });
		});
	}
	
	showLoginModal = () => {
		this.props.dispatch({ type: 'SHOW_LOGIN_MODAL', showLoginModal: true });
	}
	
	hideLoginModal = () => {
		this.props.dispatch({ type: 'SHOW_LOGIN_MODAL', showLoginModal: false });
	}

	constructor(props) {
		super(props);

		this.loginModal;
	}

	render({ openSidenav, store: { userLogged, showLoader, showLoginModal } }) {
		console.log(this.props);
		return (
			<div>
				<AppBar
					primary
					leftSection={<TitleSection openSidenav={openSidenav} />}
					rightSection={
						<RightSection
							isLogged={userLogged}
							onClick={userLogged ? this.handleLogOut : this.showLoginModal}
						/>
					}
				/>
				{showLoginModal && (
					<LoginModal
						hideLoginModal={this.hideLoginModal}
						onLogin={this.handleLogin}
					/>
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
