import { h } from 'preact';
import { CubeGrid } from 'styled-loaders';

const Loader = () => (
	<div style={styles.loaderWrapper}>
		<CubeGrid size="100px" color="rgb(255, 55, 118)" />
	</div>
);

export default Loader;

const styles = {
	loaderWrapper: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		zIndex: 200
	}
};