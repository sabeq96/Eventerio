import { List, ListHeader, ListItem, Icon, Link, Button } from 'preact-fluid';
import { route } from 'preact-router';
import OutsideClickHandler from '../OutsideClickHandler';

import './style';

const links = [{
	name: 'Test single Event',
	path: '/events/123'
}, {
	name: 'Home Page',
	path: '/'
}, {
	name: 'Home Page',
	path: '/'
}, {
	name: 'Home Page',
	path: '/'
}];

const InstallButton = ({ showButton, onClick }) => (
	showButton && (
		<Button
			secondary
			onClick={onClick}
			right={
				<Icon name="download" size="xsmall" />
			}
		>
			Install App
		</Button>
	)
);

const Nav = ({ closeSidenav, onInstallAppClick, showInstallButton, opened }) => (
	<OutsideClickHandler onClickOutside={opened && closeSidenav} id="sidebarList" style={styles.sidebarWrapper}>
		<List style={styles.list}>
			<ListHeader
				custom={
					<div onclick={closeSidenav} style={styles.header}>
						<span style={styles.text}>Close</span>
						<Icon name="times" size="xsmall" />
					</div>
				}
			/>
			{links.map((link) => (
				<ListItem>
					<Link
						href={link.path}
							onClick={() => { // eslint-disable-line
							route(link.path);
							closeSidenav();
						}}
					>
						{link.name}
					</Link>
				</ListItem>
			))}
			<div style={styles.installButton}>
				<InstallButton showButton={showInstallButton} onClick={onInstallAppClick} />
			</div>
		</List>
	</OutsideClickHandler>
);

const styles = {
	header: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer'
	},
	text: {
		marginRight: '5px'
	},
	sidebarWrapper: {
		display: 'flex',
		alignItems: 'stretch',
		height: '100%'
	},
	list: {
		position: 'relative',
		margin: '3px',
		width: '194px',
		paddingBottom: '70px'
	},
	installButton: {
		position: 'absolute',
		width: '160px',
		bottom: '10px',
		marginLeft: '20px'
	}
};

export default Nav;