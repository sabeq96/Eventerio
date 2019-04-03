import './style';
import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { ThemeProvider } from 'preact-fluid';

import Sidebar from 'preact-sidenav';
import Header from './components/Header';
import Nav from './components/Nav';
import Home from './containers/Home';

const theme = {};

class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	}
	//TODO: FIX THEME PROVIDER, CURRENTRY DOES NOT PASS THEME PROP
	render() {
		return (
			<ThemeProvider theme={theme}>
				<div id="app">
					<Sidebar sidebar={<Nav />}>
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