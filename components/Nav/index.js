import { List, ListHeader, ListItem, Icon, Link, Button } from 'preact-fluid';
import { route } from 'preact-router';
import OutsideClickHandler from '../OutsideClickHandler';

import './style';

const links = [{
	name: 'Test single Event',
	path: '/events/-LdU_ylvZD0OpsyjZXjg'
}, {
	name: 'Test Event List',
	path: '/events/'
}, {
	name: 'Add Mod Event',
	path: '/addModEvent/-LdU_ylvZD0OpsyjZXjg'
}, {
	name: 'Own Events',
	path: '/ownEvents/'
}, {
	name: 'Going To Events',
	path: '/goingToEvents'
}, {
	name: 'Account settings',
	path: '/accountSettings'
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
				<Link
					key={link.path}
					href={link.path}
					onClick={() => { // eslint-disable-line
						route(link.path);
						closeSidenav();
					}}
				>
					<ListItem>
						{link.name}
					</ListItem>
				</Link>
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