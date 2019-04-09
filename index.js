import './style';
import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'statty';
import { ThemeProvider } from 'preact-fluid';

import Sidebar from 'preact-sidenav';
import Header from './components/Header';
import Nav from './components/Nav';
import Home from './containers/Home';

import { beforeInstallListener, promptInstallApp } from './utils/beforeInstallPrompt';
import { initialState } from './utils/store';

const theme = {};

class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	}

	handleAppInstall = () => {
		promptInstallApp(this);
	}

	getNav = () => (
		<Nav
			onInstallAppClick={this.handleAppInstall}
			showInstallButton={this.state.showInstallButton}
		/>
	)

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
	render() {
		return (
			<Provider state={initialState}>
				<ThemeProvider theme={theme}>
					<div id="app">
						<Sidebar sidebar={this.getNav()}>
							<Header />
						</Sidebar>
						<Router onChange={this.handleRoute}>
							<Home path="/" />
						</Router>
					</div>
				</ThemeProvider>
			</Provider>
		);
	}
}

export default App;