import { Icon, Image } from 'preact-fluid';

const AvatarSection = ({ avatarUrl, onChange }) => {
	return (
		<div style={styles.avatarWrapper}>
			<label for="fileInput">
				<Image style={styles.image} src={avatarUrl ? avatarUrl : 'https://via.placeholder.com/120/?text=Avatar'} />
				<Icon style={styles.icon} name={avatarUrl ? 'pen': 'plus'} size="x-small" color="#5a33a7" />
			</label>
			<input type="file" id="fileInput" style={styles.fileInput} onChange={onChange} />
		</div>
	);
};

const styles = {
	avatarWrapper: {
		margin: 'auto',
		position: 'relative',
		display: 'block'
	},
	image: {
		width: '120px',
		height: '120px',
		borderRadius: '50%'
	},
	icon: {
		position: 'absolute',
		right: '1%',
		bottom: '1%',
		display: 'block',
		borderRadius: '50%',
		boxShadow: '0px 0px 3px #000',
		padding: '6%',
		color: '#ffffff',
		backgroundColor: '#ff3776'
	},
	fileInput: {
		display: 'none'
	}
};

export default AvatarSection;
