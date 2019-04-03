import './style';
import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { ThemeProvider } from 'preact-fluid';

import Sidebar from 'preact-sidenav';
import Header from './components/Header';
import Nav from './components/Nav';
import Home from './containers/Home';

import { beforeInstallListener, promptInstallApp } from './utils/beforeInstallPrompt';

const theme = {};

class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	}

	handleAppInstall = () => {
		promptInstallApp(this);
	}

	constructor(props) {
		super(props);

		this.state = {
			showInstallButton: false
		};

		this.defferedPrompt;
	}

	componentDidMount = () => {
		beforeInstallListener(this);
	}
	//TODO: FIX THEME PROVIDER, CURRENTRY DOES NOT PASS THEME PROP
	render(props, { showInstallButton }) {
		return (
			<ThemeProvider theme={theme}>
				<div id="app">
					<Sidebar
						sidebar={
							<Nav
								onInstallAppClick={this.handleAppInstall}
								showInstallButton={showInstallButton}
							/>
						}
					>
						<Header />
					</Sidebar>
					<Router onChange={this.handleRoute}>
						<Home path="/" />
					</Router>
				</div>
			</ThemeProvider>
		);
	}
}

export default App;