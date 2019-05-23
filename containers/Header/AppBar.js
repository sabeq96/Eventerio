import { AppBar as HeaderAppBar } from 'preact-fluid';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

const AppBar = ({ openSidenav, user, handleLogOut, showLoginModal }) => (
	<HeaderAppBar
		style={{ height: 80, padding: '0 5%' }}
		primary
		leftSection={<LeftSection openSidenav={openSidenav} />}
		rightSection={
			<RightSection
				isLogged={user}
				onClick={user ? handleLogOut : showLoginModal}
			/>
		}
	/>
);

export default AppBar;