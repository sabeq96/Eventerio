import { h, Component } from 'preact';
import { AppBar, Button, Modal, Icon } from 'preact-fluid';
import LoginModal from '../Login';
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
	handleLoginButtonClick = () => {
		this.modal.show(
			<LoginModal
				modalRef={this.modal}
				onLogin={this.handleLogIn}
			/>
		);
	}

	constructor(props) {
		super(props);

		this.modal;

		this.handleLogOut = () => props.dispatch({ type: 'LOGOUT' });
		this.handleLogIn = (data) => props.dispatch({ type: 'LOGIN', ...data });
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
				<Modal ref={modal => this.modal = modal} />
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
