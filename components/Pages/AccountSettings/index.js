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
							<TextField label="Name" effect="line" value={state.user.name} onChange={linkstate(this, 'user.name')} />
							<TextField label="Surname" effect="line" value={state.user.surname} onChange={linkstate(this, 'user.surname')} />
							<TextField label="Email" effect="line" value={state.user.email} onChange={linkstate(this, 'user.email')} />
							<TextField label="City" effect="line" value={state.user.city} onChange={linkstate(this, 'user.city')} />
							<label>Events max distance</label>
							<input
								type="range"
								min={1}
								max={100}
								value={state.user.settings.eventsMaxDistance}
								onChange={linkstate(this, 'user.settings.eventsMaxDistance')}
							/>
						</CardBody>
					</div>
					<CardFooter
						left={<Button onClick={this.handleChangePassword}>Change password</Button>}
						right={<Button primary onClick={this.handleSave}>Save</Button>}
					/>
				</Card>
			</div>
		);
	}
}

const styles = {
	cardWrapper: {
		margin: '0 auto',
		maxWidth: '350px'
	}
};

export default withStore(AccountSettings);