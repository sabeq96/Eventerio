import { Component } from 'preact';
import AddModEventPage from '../../components/Pages/AddModEvent';

import { withStore, actions } from '../../utils/store';
import Firebase from '../../utils/firebase';
	
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
		Firebase.updateEvent(payload).then((resp) => {
			// console.log(resp);
		}).catch((err) => {
			// console.log(err);
		}).finally(() => {
			dispatch({ type: actions.SHOW_LOADER, showLoader: false });
		});
	}

	onChange = (name, value) => {
		this.setState({ [name]: value });
		this.forceUpdate();
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
			startTime: '',
			endTime: '',
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

		if (eventId) {
			dispatch({ type: actions.SHOW_LOADER, showLoader: true });

			Firebase.getEvent(eventId).then((event) => {
				console.log('heloooo', event.ownerId);
				this.setState({ ...event, id: eventId }, () => {
					Firebase.getEventOrganizer(event.ownerId).then((user) => {
						this.setState({
							organizerAvatarUrl: user.avatarUrl,
							organizer: `${user.name} ${user.surname}`
						});
					}).catch((error) => {
						this.setState({ error });
					});
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
