import { AppBar } from 'preact-fluid';
import HeaderLeftSection from '../HeaderLeftSection';
import HeaderRightSection from '../HeaderRightSection';

const HeaderAppBar = ({ openSidenav, user, handleLogOut, showLoginModal }) => (
	<AppBar
		primary
		leftSection={<HeaderLeftSection openSidenav={openSidenav} />}
		rightSection={
			<HeaderRightSection
				isLogged={user}
				onClick={user ? handleLogOut : showLoginModal}
			/>
		}
	/>
);

export default HeaderAppBar;