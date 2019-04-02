import { h, Component } from 'preact';
import { AppBar, Button, Modal, Icon } from 'preact-fluid';
import LoginModal from './Login';

const RightSection = ({ isLogged, onClick }) => (
	<Button secondary onClick={onClick}>
		{isLogged ? 'Log Out' : 'Log In'}
	</Button>
);

const InstallButton = ({ showButton, onClick }) => (
	showButton && (
		<Button
			secondary
			onClick={onClick}
			style={{ marginRight: '20px' }}
			right={
				<Icon
					name="download"
					size="xsmall"
				/>
			}
		>
			Install App
		</Button>
	)
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

	promptInstallApp = () => {
		this.deferredPrompt.prompt();
		this.deferredPrompt.userChoice
			.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					this.setState({ showInstallButton: false });
				}
			});
	}

	constructor(props) {
		super(props);

		this.state = {
			logged: false,
			showInstallButton: false
		};

		this.defferedPrompt;
		this.modal;
	}

	componentDidMount = () => {
		window.addEventListener('beforeinstallprompt', (e) => {
			this.setState({ showInstallButton: true });
			// Prevent Chrome 67 and earlier from automatically showing the prompt
			e.preventDefault();
			// Stash the event so it can be triggered later.
			this.deferredPrompt = e;
			this.deferredPrompt.userChoice
				.then((choiceResult) => {
					if (choiceResult.outcome === 'accepted') {
						this.setState({ showInstallButton: false });
					}
				});
		});
	}

	render(props, { logged, showInstallButton }) {
		return (
			<div>
				<AppBar
					primary
					title="Eventerio"
					titleStyle={{ color: 'white', fontSize: '24px', marginLeft: '20px' }}
					rightSection={[
						<InstallButton showButton={showInstallButton} onClick={this.promptInstallApp} />,
						<RightSection
							isLogged={logged}
							onClick={logged ? this.handleLogoutButtonClick : this.handleLoginButtonClick}
						/>
					]}
				/>
				<Modal ref={modal => this.modal = modal} />
			</div>
		);
	}
}

export default Header;
