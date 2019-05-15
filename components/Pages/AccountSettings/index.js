import { Component } from 'preact';
import { Button, Card, CardBody, CardFooter, CardHeader, TextField } from 'preact-fluid';
import linkstate from 'linkstate';

import { withStore, actions } from '../../../utils/store';
import Firebase from '../../../utils/firebase';

import AvatarSection from './AvatarSection';

class AccountSettings extends Component {

	handleChangePassword = () => {
		this.props.dispatch({ type: actions.SHOW_LOGIN_MODAL, modalType: 'CHANGE_PASSWORD' });
	}

	handleFileChange = (e) => {
		const file = e.target.files[0];

		this.setState({
			user: {
				...this.state.user,
				avatarUrl: URL.createObjectURL(file)
			},
			file
		});
	}

	handleSave = () => {
		if (this.state.file) this.saveUserDataWithAvatar();
		else this.saveUserData();
	}

	saveUserData = () => {
		const { dispatch } = this.props;

		dispatch({ type: actions.SHOW_LOADER, showLoader: true });
		Firebase.updateUser(this.state.user).then(() => {
			dispatch({ type: actions.SHOW_LOADER, showLoader: false });
		}).catch(error => {
			this.setState({ error: error.message });
		}).finally(() => {
			dispatch({ type: actions.SHOW_LOADER, showLoader: false });
		});
	}

	saveUserDataWithAvatar = () => {
		const { dispatch } = this.props;

		dispatch({ type: actions.SHOW_LOADER, showLoader: true });
		Firebase.uploadFile(this.state.file).then(snapshot => {
			snapshot.ref.getDownloadURL().then(downloadURL => {
				this.setState({
					user: {
						...this.state.user,
						avatarUrl: downloadURL
					},
					file: null
				}, () => {
					Firebase.updateUser(this.state.user).then(() => {
						dispatch({ type: actions.SHOW_LOADER, showLoader: false });
					}).catch(error => {
						this.setState({ error: error.message });
					});
				});
			});
		}).catch(error => {
			this.setState({ error: error.message });
		}).finally(() => {
			dispatch({ type: actions.SHOW_LOADER, showLoader: false });
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			user: {
				avatarUrl: '',
				name: '',
				surname: '',
				email: '',
				city: '',
				settings: {
					eventsMaxDistance: 0
				}
			},
			file: null,
			error: ''
		};
	}

	componentWillReceiveProps({ store: { user } }) {
		if (user) this.setState({ user });
	}
	
	render(props, state) {
		return (
			<div className="container">
				<Card middle center>
					<CardHeader title="Account settings" />
					<AvatarSection avatarUrl={state.user.avatarUrl} onChange={this.handleFileChange} />
					<div style={styles.cardWrapper}>
						<CardBody>
							<div style={styles.textFieldWrapper}>
								<TextField label="Name" effect="line" value={state.user.name} onChange={linkstate(this, 'user.name')} />
							</div>
							<div style={styles.textFieldWrapper}>
								<TextField label="Surname" effect="line" value={state.user.surname} onChange={linkstate(this, 'user.surname')} />
							</div>
							<div style={styles.textFieldWrapper}>
								<TextField label="Email" effect="line" value={state.user.email} onChange={linkstate(this, 'user.email')} />
							</div>
							<div style={styles.textFieldWrapper}>
								<TextField label="City" effect="line" value={state.user.city} onChange={linkstate(this, 'user.city')} />
							</div>
							<div style={styles.slider}>
								<div style={{ textAlign: 'center' }}>Events max distance: {this.state.user.settings.eventsMaxDistance}</div>
								<input
									type="range"
									min={1}
									max={100}
									value={state.user.settings.eventsMaxDistance}
									onChange={linkstate(this, 'user.settings.eventsMaxDistance')}
									styles={styles.slider}
								/>
							</div>
						</CardBody>
					</div>
					<div style={styles.footer}>
						<Button onClick={this.handleChangePassword} style={styles.button}>Change password</Button>
						<Button primary onClick={this.handleSave} style={styles.button}>Save</Button>
					</div>
				</Card>
			</div>
		);
	}
}

const styles = {
	cardWrapper: {
		margin: '0 auto',
		maxWidth: '350px'
	},
	textFieldWrapper: {
		paddingBottom: '30px'
	},
	slider: {
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
		margin: '50px'
	},
	footer: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		margin: '50px'
	},
	button: {
		minWidth: '160px',
		marginBottom: '20px'
	}
};

export default withStore(AccountSettings);