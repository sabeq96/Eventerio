import { h, Component } from 'preact';
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
	showLoginModal = () => {
		const { dispatch } = this.props;
		dispatch({ type: 'SHOW_LOGIN_MODAL', showLoginModal: true });
	}

	constructor(props) {
		super(props);

		this.loginModal;
	}

	render({ openSidenav, dispatch, store: { userLogged, showLoader, showLoginModal } }) {
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
