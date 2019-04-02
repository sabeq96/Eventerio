import { h, Component } from 'preact';
import linkstate from 'linkstate';
import {  Button, Card, CardHeader, CardBody, CardFooter, TextField } from 'preact-fluid';

class LoginModal extends Component {
	handleLoginChange = (e) => {
		this.setState({ login: e.target.value });
	}

	handlePasswordChange = (e) => {
		this.setState({ password: e.target.value });
	}

	onLoginClick = () => {
		const { modalRef, onLogin } = this.props;
		const { login, password } = this.state;

		onLogin({ login, password });
		modalRef.hide();
	}

	constructor(props) {
		super(props);

		this.state = {
			login: '',
			password: ''
		};
	}

	render(props, { login, password }) {
		return (
			<Card style={{ maxWidth: 350 }}>
				<CardHeader title="Log In" />
				<form>
					<CardBody>
						<TextField type="text" label="login" onChange={linkstate(this, 'login')} value={login} />
						<TextField type="password" label="password" onChange={linkstate(this, 'password')} value={password} style={{ marginTop: '20px' }} />
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
		);
	}
}

export default LoginModal;