import './style';
import { Component } from 'preact';
import { Router, route } from 'preact-router';
import { Provider } from 'statty';
import { ThemeProvider } from 'preact-fluid';
import Firebase from './utils/firebase';

import Sidebar from 'preact-sidenav';
import Header from './containers/Header';
import Nav from './components/Nav';

import Home from './containers/Home';
import EventList from './containers/EventList';
import OwnEvents from './containers/OwnEvents';
import GoingToEvents from './containers/GoingToEvents';
import AddModEvent from './containers/AddModEvent';
import SingleEvent from './containers/SingleEvent';
import AccountSettings from './containers/AccountSettings';

import { beforeInstallListener, promptInstallApp } from './utils/beforeInstallPrompt';
import { initialState } from './utils/store';

class App extends Component {
	handleAppInstall = () => {
		promptInstallApp(this);
	}

	getNav = () => (
		<Nav
			onInstallAppClick={this.handleAppInstall}
			showInstallButton={this.state.showInstallButton}
		/>
	)

	handleRouteChange = (e) => {
		if (e.url !== '/events' && !this.state.login) {
			route('/events', true);
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			login: false,
			loadingApp: true,
			showInstallButton: false
		};

		this.defferedPrompt;
	}

	componentDidMount = () => {
		Firebase.auth.onAuthStateChanged((user) => {
			if (user) this.setState({ login: true });
			this.setState({ loadingApp: false });
		});

		beforeInstallListener(this);
	}

	render() {
		return (
			<Provider state={initialState}>
				<ThemeProvider>
					<div id="app">
						<Sidebar sidebar={this.getNav()}>
							<Header />
						</Sidebar>
						{!this.state.loadingApp && (
							<Router onChange={this.handleRouteChange}>
								<Home path="/" />
								<AddModEvent path="/addModEvent/:eventId" />
								<SingleEvent path="/events/:eventId" />
								<EventList path="/events" />
								<OwnEvents path="/ownEvents" />
								<GoingToEvents path="/goingToEvents" />
								<AccountSettings path="/accountSettings" />
							</Router>
						)}
					</div>
				</ThemeProvider>
			</Provider>
		);
	}
}

export default App;