import { Icon } from 'preact-fluid';
import logo from '../../assets/Logo/EVENTERIO_LOGO.svg';

const LeftSection = ({ openSidenav }) => (
	<div onClick={openSidenav} style={styles.titleWrapper}>
		<Icon
			name="bars"
			size="small"
		/>
        <img src={logo} alt="Eventerio Logo" style={styles.title} />
	</div>
);

const styles = {
	title: {
		margin: '0 15px',
        maxWidth: '100%',
        maxHeight: '30px'
	},
	titleWrapper: {
		cursor: 'pointer'
	}
};

export default LeftSection;
