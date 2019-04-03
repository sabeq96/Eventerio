import { h, Component } from 'preact';
import { AppBar, Button, Modal, Icon } from 'preact-fluid';
import LoginModal from './Login';

const RightSection = ({ isLogged, onClick }) => (
	<Button secondary onClick={onClick}>
		{isLogged ? 'Log Out' : 'Log In'}
	</Button>
);

const TitleSection = ({ openSidenav }) => (
	<div onClick={openSidenav}>
		<Icon
			name="bars"
			size="small"
		/>
		<span style={styles.title}>Eventerio</span>
	</div>
);
	
class Header extends Component {
	handleLoginButtonClick = () => {
		this.modal.show(
			<LoginModal modalRef={this.modal} onLogin={this.handleLoginClick} />
		);
	}

	handleLogoutButtonClick = () => {
		this.setState({ logged: false });
	}

	handleLoginClick = ({ login, password }) => {
		this.setState({ logged: true });
	}

	constructor(props) {
		super(props);

		this.state = {
			logged: false
		};

		this.modal;
	}

	render({ openSidenav, ...props }, { logged, showInstallButton }) {
		return (
			<div>
				<AppBar
					primary
					leftSection={<TitleSection openSidenav={openSidenav} />}
					rightSection={
						<RightSection
							isLogged={logged}
							onClick={logged ? this.handleLogoutButtonClick : this.handleLoginButtonClick}
						/>
					}
				/>
				<Modal ref={modal => this.modal = modal} />
			</div>
		);
	}
}

const styles = {
	title: {
		fontSize: '24px',
		marginLeft: '10px'
	}
};

export default Header;
