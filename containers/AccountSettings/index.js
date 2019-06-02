import { Component } from 'preact';

import { withStore, actions } from '../../utils/store';
import Firebase from '../../utils/firebase';

import AccountSettingsPage from '../../components/Pages/AccountSettings';

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

	handleSave = (userData) => {
		if (this.state.file) this.saveUserDataWithAvatar(userData);
		else this.saveUserData(userData);
	}

	saveUserData = (userData) => {
		const { dispatch } = this.props;

		dispatch({ type: actions.SHOW_LOADER, showLoader: true });
		
		Firebase.updateUser(userData).then(() => {
			Firebase.getUser().then((user) => {
				this.setState({ user });
				dispatch({
					type: 'SHOW_ACTION_RESULT_MODAL',
					actionResultModalType: 'SUCCESS',
					actionResultModalMessage: 'Gut Job !'
				});
			});
		}).catch(error => {
			this.setState({ error: error.message });
		}).finally(() => {
			dispatch({ type: actions.SHOW_LOADER, showLoader: false });
		});
	}

	saveUserDataWithAvatar = (userData) => {
		const { dispatch } = this.props;

		dispatch({ type: actions.SHOW_LOADER, showLoader: true });

		Firebase.uploadFile(this.state.file, 'avatars').then((snapshot) => {
			snapshot.ref.getDownloadURL().then((avatarUrl) => {
				Firebase.updateUser({ ...userData, avatarUrl }).then(() => {
					Firebase.getUser().then((user) => {
						dispatch({
							type: 'SHOW_ACTION_RESULT_MODAL',
							actionResultModalType: 'SUCCESS',
							actionResultModalMessage: 'Gut Job !'
						});
						this.setState({
							user,
							file: null
						});
					});
				}).catch((error) => {
					this.setState({ error: error.message });
				});
			}).catch((error) => {
				this.setState({ error: error.message });
			});
		}).catch((error) => {
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

	componentDidMount() {
		Firebase.getUser().then((user) => {
			this.setState({ user });
		});
	}
    
	render(props, { user: { avatarUrl, name, surname, email, city, settings } }) {
		return (
			<AccountSettingsPage
				avatarUrl={avatarUrl}
				name={name}
				surname={surname}
				email={email}
				city={city}
				settings={settings}
				onAvatarFileChange={this.handleFileChange}
				onChangePasswordButtonClick={this.handleChangePassword}
				onSubmit={this.handleSave}
			/>
		);
	}
}

export default withStore(AccountSettings);