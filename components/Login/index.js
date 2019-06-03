import { Component } from 'preact';
import linkstate from 'linkstate';
import Firebase from '../../utils/firebase';
import { withStore, actions } from '../../utils/store';

import { Button, Card, CardHeader, CardBody, CardFooter } from 'preact-fluid';
import OutsideClickHandler from '../OutsideClickHandler';

import ContentTypes from './ContentTypes';

import errorMessages from '../../constants/errorMessages';

class LoginModal extends Component {
	changeContentTypeToSignIn = () => {
		this.setState({ error: null });
		this.props.dispatch({ type: actions.SHOW_LOGIN_MODAL, modalType: 'SIGNIN' });
	}

	changeContentTypeToLogIn = () => {
		this.setState({ error: null });
		this.props.dispatch({ type: actions.SHOW_LOGIN_MODAL, modalType: 'LOGIN' });
	}

	changeContentTypeToResetPassword = () => {
		this.setState({
			email: '',
			error: null
		});
		this.props.dispatch({ type: actions.SHOW_LOGIN_MODAL, modalType: 'RESET_PASSWORD' });
	}
	
	getContentSpecs = (type) => {
		const CONTENT_TYPES = {
			SIGNIN: { key: 'SIGNIN', value: 'Sign In', action: this.handleSignIn },
			LOGIN: { key: 'LOGIN', value: 'Log In', action: this.handleLogin },
			CHANGE_PASSWORD: { key: 'CHANGE_PASSWORD', value: 'Change password', action: this.handleChangePassword },
			RESET_PASSWORD: { key: 'RESET_PASSWORD', value: 'Reset password', action: this.handleResetPassword }
		};

		return type ? CONTENT_TYPES[type]: {};
	}

	hideModal = () => {
		const { dispatch } = this.props;
		dispatch({ type: actions.SHOW_LOGIN_MODAL, modalType: false });
	}

	handleChangePassword = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		const { oldPassword, password, confirmPassword } = this.state;
		
		if (password === confirmPassword) {
			dispatch({ type: actions.SHOW_LOADER, showLoader: true });

			Firebase.reauthenticateUser(oldPassword).then(() => {
				Firebase.updatePassword(password).then(() => {
					dispatch({ type: actions.SHOW_LOGIN_MODAL, modalType: false });
				}).catch((error) => {
					this.setState({ error: error.message });
				});
			}).catch((error) => {
				this.setState({ error: error.message });
			}).finally(() => {
				dispatch({ type: actions.SHOW_LOADER, showLoader: false });
			});
		}
		else {
			this.setState({ error: errorMessages.passwordsNotEqual });
		}
	}

	handleLogin = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		const { email, password } = this.state;

		dispatch({ type: actions.SHOW_LOADER, showLoader: true });
		Firebase.logIn(email, password).then(() => {
			dispatch({ type: actions.SHOW_LOGIN_MODAL, modalType: false });
		}).catch((error) => (
			this.setState({ error: error.message })
		)).finally(() => {
			dispatch({ type: actions.SHOW_LOADER, showLoader: false });
		});
	}

	handleResetPassword = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		const { email } = this.state;

		dispatch({ type: actions.SHOW_LOADER, showLoader: true });
		Firebase.resetPassword(email).then(() => {
			this.setState({
				email: '',
				error: ''
			});
			dispatch({ type: actions.SHOW_LOGIN_MODAL, modalType: 'LOGIN' });
		}).catch((error) => {
			this.setState({ error: error.message });
		}).finally(() => {
			dispatch({ type: actions.SHOW_LOADER, showLoader: false });
		});
	}

	handleSignIn = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		const { email, password, confirmPassword } = this.state;

		if ( password === confirmPassword ) {
			dispatch({ type: actions.SHOW_LOADER, showLoader: true });
			Firebase.createUser(email, password).then(() => {
				dispatch({ type: actions.SHOW_LOGIN_MODAL, modalType: false });
			}).catch((error) => (
				this.setState({ error: error.message })
			)).finally(() => {
				dispatch({ type: actions.SHOW_LOADER, showLoader: false });
			});
		}
		else {
			this.setState({ error: errorMessages.passwordsNotEqual });
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			oldPassword: '',
			password: '',
			confirmPassword: '',
			error: null
		};
	}

	render({ store }, { email, oldPassword, password, confirmPassword, error }) {
		return (
			<div style={styles.loginModalWrapper}>
				<OutsideClickHandler onClickOutside={this.hideModal} id="loginModal">
					<Card style={styles.card}>
						<CardHeader title={this.getContentSpecs(store.modalType).value} />
						<form>
							<CardBody>
								<ContentTypes
									values={{ email, oldPassword, password, confirmPassword, error }}
									contentType={store.modalType}
									onChange={(fieldName) => linkstate(this, fieldName)} // eslint-disable-line
								/>
							</CardBody>
							<CardFooter
								right={
									<Button
										primary
										onClick={this.getContentSpecs(store.modalType).action}
									>
										{this.getContentSpecs(store.modalType).value}
									</Button>
								}
							/>
							{ store.modalType === 'LOGIN' && (
								<div>
									<div style={styles.linkWrapper} onClick={this.changeContentTypeToSignIn}>
										You don't have account? <span style={styles.link}>Sign In</span>
									</div>
									<div style={styles.linkWrapper} onClick={this.changeContentTypeToResetPassword}>
										Did you forget your password? <span style={styles.link}>Reset password</span>
									</div>
								</div>
							)}

							{ store.modalType === 'SIGNIN' && (
								<div>
									<div style={styles.linkWrapper} onClick={this.changeContentTypeToLogIn}>
										You already have account? <span style={styles.link}>Log In</span>
									</div>
								</div>
							)}
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
	},
	linkWrapper: {
		textAlign: 'center',
		padding: '15px',
		cursor: 'pointer'
	},
	link: {
		color: '#FF3776',
		fontWeight: 'bold'
	}
};

export default withStore(LoginModal);
