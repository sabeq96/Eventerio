import { h, Component } from 'preact';
import { List, ListHeader, ListItem, Icon, Link, Button } from 'preact-fluid';
import { route } from 'preact-router';

import './style';

const links = [{
	name: 'Menu Item',
	path: '/123'
}, {
	name: 'Menu Item',
	path: '/123'
}, {
	name: 'Menu Item',
	path: '/123'
}, {
	name: 'Menu Item',
	path: '/123'
}, {
	name: 'Menu Item',
	path: '/123'
}, {
	name: 'Menu Item',
	path: '/123'
}, {
	name: 'Menu Item',
	path: '/123'
}, {
	name: 'Menu Item',
	path: '/123'
}, {
	name: 'Menu Item',
	path: '/123'
}, {
	name: 'Menu Item',
	path: '/123'
}, {
	name: 'Menu Item',
	path: '/123'
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

class Nav extends Component {
	promptInstallApp = () => {
		this.deferredPrompt.prompt();
		this.deferredPrompt.userChoice
			.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					this.setState({ showInstallButton: false });
				}
			});
	}

	constructor(props) {
		super(props);

		this.state = {
			showInstallButton: false
		};

		this.defferedPrompt;
	}

	componentDidMount = () => {
		window.addEventListener('beforeinstallprompt', (e) => {
			this.setState({ showInstallButton: true });
			// Prevent Chrome 67 and earlier from automatically showing the prompt
			e.preventDefault();
			// Stash the event so it can be triggered later.
			this.deferredPrompt = e;
			this.deferredPrompt.userChoice
				.then((choiceResult) => {
					if (choiceResult.outcome === 'accepted') {
						this.setState({ showInstallButton: false });
					}
				});
		});
	}

	render({ closeSidenav }, { showInstallButton }) {
		return (
			<List style={styles.list}>
				<ListHeader
					custom={
						<div onclick={closeSidenav} style={styles.wrapper}>
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
				<ListItem style={styles.installButton}>
					<InstallButton showButton={showInstallButton} onClick={this.promptInstallApp} />
				</ListItem>
			</List>
		);
	}
}
const styles = {
	wrapper: {
		display: 'flex',
		alignItems: 'center'
	},
	text: {
		marginRight: '5px'
	},
	list: {
		margin: '3px',
		width: '200px',
		position: 'relative',
		minHeight: 'calc(100vh - 10px)',
		boxSizing: 'border-box',
		paddingBottom: '70px'
	},
	installButton: {
		position: 'absolute',
		width: '160px',
		bottom: '10px'
	}
};

export default Nav;