import './style';
import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { ThemeProvider } from 'preact-fluid';

import Header from './components/Header';
import Home from './containers/Home';

const theme = {};

class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<div id="app">
					<Header />
					<Router onChange={this.handleRoute}>
						<Home path="/" />
					</Router>
				</div>
			</ThemeProvider>
		);
	}
}

export default App;