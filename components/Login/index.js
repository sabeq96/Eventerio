import { h, Component } from 'preact';
import linkstate from 'linkstate';
import Firebase from '../../utils/firebase';
import { withStore } from '../../utils/store';

import {  Button, Card, CardHeader, CardBody, CardFooter } from 'preact-fluid';
import OutsideClickHandler from '../OutsideClickHandler';

import ContentTypes from './ContentTypes';

class LoginModal extends Component {
	handleLogin = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		const { email, password } = this.state;

		dispatch({ type: 'SHOW_LOADER', showLoader: true });
		Firebase.logIn(email, password).then(() => {
			dispatch({ type: 'LOGIN', email, password });
			dispatch({ type: 'SHOW_LOGIN_MODAL', showLoginModal: false });
		}).catch((error) => (
			this.setState({ error: error.message })
		)).finally(() => {
			dispatch({ type: 'SHOW_LOADER', showLoader: false });
		});
	}

	handleLogOut = () => {
		const { dispatch } = this.props;

		Firebase.logOut().then(() => {
			dispatch({ type: 'LOGOUT' });
		});
	}

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			error: null
		};
	}

	render(props, { email, password, confirmPassword, error }) {
		return (
			<div style={styles.loginModalWrapper}>
				<OutsideClickHandler onClickOutside={this.hideModal} id="loginModal">
					<Card style={styles.card}>
						<CardHeader title="Log In" />
						<form>
							<CardBody>
								<ContentTypes
									values={{ email, password, confirmPassword, error }}
									contentType="LOGIN"
									onChange={(fieldName) => linkstate(this, fieldName)}
								/>
							</CardBody>
							<CardFooter
								right={
									<Button
										primary
										onClick={this.handleLogin}
									>
											Log In
									</Button>
								}
							/>
						</form>
					</Card>
				</OutsideClickHandler>
			</div>
		);
	}
}

const styles = {
	card: {
		width: '350px'
	},
	loginModalWrapper: {
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
		zIndex: 100
	}
};

export default withStore(LoginModal);