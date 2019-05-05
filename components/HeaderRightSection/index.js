import { Button } from 'preact-fluid';

const HeaderRightSection = ({ isLogged, onClick }) => (
	<Button secondary onClick={onClick}>
		{isLogged ? 'Log Out' : 'Log In'}
	</Button>
);

export default HeaderRightSection;
