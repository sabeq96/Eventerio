import { h, Component } from 'preact';
import { AppBar, Button, Modal, Icon } from 'preact-fluid';
import LoginModal from '../Login';
import Firebase from '../../utils/firebase';
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
		const { dispatch } = this.props;

		return Firebase.logIn(email, password).then((authUser) => {
			console.log(authUser);

			dispatch({ type: 'LOGIN', email, password });
		});
	}

	handleLogOut = () => {
		const { dispatch } = this.props;

		return Firebase.logOut().then((authUser) => {
			console.log(authUser);
			dispatch({ type: 'LOGOUT' });
		});
	}
	
	handleLoginButtonClick = () => {
		this.modal.show(
			<LoginModal
				modalRef={this.modal}
				onLogin={this.handleLogin}
			/>
		);
	}

	constructor(props) {
		super(props);

		this.modal;
	}

	render({ openSidenav, store: { userLogged } }) {
		return (
			<div>
				<AppBar
					primary
					leftSection={<TitleSection openSidenav={openSidenav} />}
					rightSection={
						<RightSection
							isLogged={userLogged}
							onClick={userLogged ? this.handleLogOut : this.handleLoginButtonClick}
						/>
					}
				/>
				<Modal ref={modal => this.modal = modal} id="loginModalWrapper" />
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
