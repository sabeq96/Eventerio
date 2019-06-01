import { Component } from 'preact';
import { route } from 'preact-router';
import AddModEventPage from '../../components/Pages/AddModEvent';

import { withStore, actions } from '../../utils/store';
import Firebase from '../../utils/firebase';
import _isArray from 'lodash/isArray';
	
class AddModEvent extends Component {
	onConfirm = () => {
		const { file } = this.state;
		const { dispatch } = this.props;
		dispatch({ type: actions.SHOW_LOADER, showLoader: true });

		if (file) {
			Firebase.uploadFile(file, 'eventImages').then((snapshot) => {
				snapshot.ref.getDownloadURL().then((photoUrl) => {
					this.updateEvent({ ...this.state, photoUrl });
				});
			}).catch((error) => {
				this.setState({ error });
			});
		}
		else {
			this.updateEvent(this.state);
		}
	}

	updateEvent = (payload) => {
		const { dispatch } = this.props;
		const clonedPayload = { ...payload };

		if (_isArray(payload.startTime)) {
			clonedPayload.startTime = payload.startTime[0];
		}

		if (_isArray(payload.endTime)) {
			clonedPayload.endTime = payload.endTime[0];
		}
	
		Firebase.updateEvent(clonedPayload).then((resp) => {
			route('/events/');
			dispatch({
				type: 'SHOW_ACTION_RESULT_MODAL',
				actionResultModalType: 'SUCCESS',
				actionResultModalMessage: 'Gut Job !'
			});
		}).catch(() => {
			dispatch({
				type: 'SHOW_ACTION_RESULT_MODAL',
				actionResultModalType: 'SUCCESS',
				actionResultModalMessage: 'Oops something went wrong'
			});
		}).finally(() => {
			dispatch({ type: actions.SHOW_LOADER, showLoader: false });
		});
	}

	onChange = (name, value) => {
		this.setState({ [name]: value });
	}

	backgroundChange = (e) => {
		const file = e.target.files[0];
	
		this.setState({ file });
	}

	constructor(props) {
		super(props);

		this.state = {
			file: false,
			id: '',
			name: '',
			shortDescription: '',
			photoUrl: '',
			startTime: new Date().getTime(),
			endTime: new Date().getTime(),
			address: '',
			coordinates: {
				latitude: 0,
				longitude: 0
			},
			organizerAvatarUrl: '',
			organizer: '',
			description: '',
			error: ''
		};
	}

	componentDidMount() {
		const { dispatch } = this.props;
		const eventId = this.props.eventId;

		if (eventId && eventId !== 'NEW') {
			dispatch({ type: actions.SHOW_LOADER, showLoader: true });

			Firebase.getEvent(eventId).then((event) => {
				Firebase.getEventOrganizer(event.ownerId).then((user) => {
					this.setState({
						organizerAvatarUrl: user.avatarUrl,
						organizer: `${user.name} ${user.surname}`,
						id: eventId,
						...event
					});
				}).catch((error) => {
					this.setState({ error });
				});
			}).catch((error) => {
				this.setState({ error });
			}).finally(() => {
				dispatch({ type: actions.SHOW_LOADER, showLoader: false });
			});
		}
	}

	render({}, state) {
		return (
			<AddModEventPage
				onConfirm={this.onConfirm}
				onChange={this.onChange}
				backgroundChange={this.backgroundChange}
				{...state}
			/>
		);
	}
}

export default withStore(AddModEvent);
