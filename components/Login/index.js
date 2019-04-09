import { h, Component } from 'preact';
import linkstate from 'linkstate';
import {  Button, Card, CardHeader, CardBody, CardFooter, TextField } from 'preact-fluid';
import OutsideClickHandler from '../OutsideClickHandler';

class LoginModal extends Component {
	onLoginClick = (e) => {
		e.preventDefault();
		const { onLogin } = this.props;
		const { email, password } = this.state;

		onLogin({ email, password }).then(() => {
			this.hideModal();
		}).catch((error) => {
			if (error.message) {
				this.setState({ error: error.message });
			}
		});
	}

	hideModal = () => {
		const { hideLoginModal } = this.props;

		this.setState({ email: '', password: '', error: '' });
		hideLoginModal();
	}

	getContent(contentType) {
		switch (contentType) {
			case 'LOGIN' : {
				const { email, password, error } = this.state;
				return (
					<div>
						<TextField
							type="text"
							label="email"
							onChange={linkstate(this, 'email')}
							value={email}
						/>
						<TextField
							type="password"
							label="password"
							onChange={linkstate(this, 'password')}
							value={password}
							style={{ marginTop: '20px' }}
						/>
						{error && (
							<div style={styles.error}>
								{error}
							</div>
						)}
					</div>
				);
			}

			case 'REGISTER' : {
				const { email, password, confirmPassword, error } = this.state;
				return (
					<div>
						<TextField
							type="text"
							label="email"
							onChange={linkstate(this, 'email')}
							value={email}
						/>
						<TextField
							type="password"
							label="password"
							onChange={linkstate(this, 'password')}
							value={password}
							style={{ marginTop: '20px' }}
						/>
						<TextField
							type="password"
							label="confirm password"
							onChange={linkstate(this, 'confirmPassword')}
							value={confirmPassword}
							style={{ marginTop: '20px' }}
						/>
						{error && (
							<div style={styles.error}>
								{error}
							</div>
						)}
					</div>
				);
			}

			case 'CHANGE_PASSWORD' : {
				const { password, confirmPassword, error } = this.state;
				return (
					<div>
						<TextField
							type="password"
							label="password"
							onChange={linkstate(this, 'password')}
							value={password}
							style={{ marginTop: '20px' }}
						/>
						<TextField
							type="password"
							label="confirm password"
							onChange={linkstate(this, 'confirmPassword')}
							value={confirmPassword}
							style={{ marginTop: '20px' }}
						/>
						{error && (
							<div style={styles.error}>
								{error}
							</div>
						)}
					</div>
				);
			}
		}
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

	render(props, { email, password, error }) {
		return (
			<div style={styles.loginModalWrapper}>
				<OutsideClickHandler onClickOutside={this.hideModal} id="loginModal">
					<Card style={styles.card}>
						<CardHeader title="Log In" />
						<form>
							<CardBody>
								{ this.getContent('LOGIN') }
							</CardBody>
							<CardFooter
								right={
									<Button
										primary
										onClick={this.onLoginClick}
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
	error: {
		color: '#F00',
		textAlign: 'center'
	},
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

export default LoginModal;