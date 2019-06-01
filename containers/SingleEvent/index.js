import { Component } from 'preact';
import { route } from 'preact-router';
import Firebase from '../../utils/firebase';
import { actions, withStore } from '../../utils/store';
import SingleEventPage from '../../components/Pages/SingleEvent';
import _some from 'lodash/some';

class SingleEvent extends Component {
	onJoin = () => {
		const { dispatch } = this.props;
		Firebase.takePartizipation({ id: this.props.eventId }).then((res) => {
			route('/events/');
			dispatch({
				type: 'SHOW_ACTION_RESULT_MODAL',
				actionResultModalType: 'SUCCESS',
				actionResultModalMessage: 'Gut Job !'
			});
		}).catch((err) => {
			dispatch({
				type: 'SHOW_ACTION_RESULT_MODAL',
				actionResultModalType: 'SUCCESS',
				actionResultModalMessage: 'Oops something went wrong'
			});
		});
	}

	onReject = () => {
		Firebase.rejectPartizipation({ id: this.props.eventId }).then((res) => {
			const { dispatch } = this.props;
			route('/events/');
			dispatch({
				type: 'SHOW_ACTION_RESULT_MODAL',
				actionResultModalType: 'SUCCESS',
				actionResultModalMessage: 'Gut Job !'
			});
		}).catch((err) => {
			const { dispatch } = this.props;
			dispatch({
				type: 'SHOW_ACTION_RESULT_MODAL',
				actionResultModalType: 'SUCCESS',
				actionResultModalMessage: 'Oops something went wrong'
			});
		});
	}

	onModify = () => {
		route(`/addModEvent/${this.props.eventId}`);
	}

	setRole = ({ event }) => {
		const currentUserId = Firebase.auth.currentUser.uid;
		const isOwner = event.ownerId === currentUserId;
		const isPartizipant = _some(event.attendees, (attendee, key) => key === currentUserId);
	
		this.setState({ isOwner, isPartizipant });
	}

	constructor(props) {
		super(props);

		this.state = {
			isOwner: false,
			isPartizipant: false,
			name: '',
			shortDescription: '',
			photoUrl: '',
			startTime: '',
			endTime: '',
			contactDetails: '',
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
		const { eventId, dispatch } = this.props;

		if (eventId) {
			dispatch({ type: actions.SHOW_LOADER, showLoader: true });

			Firebase.getEvent(eventId).then((event) => {
				this.setState(event, () => {
					Firebase.getEventOrganizer(event.ownerId).then((user) => {
						this.setRole({ event });
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

	render(props, state) {
		const {
			name,
			photoUrl,
			shortDescription,
			startTime,
			endTime,
			contactDetails,
			address,
			coordinates,
			description,
			organizerAvatarUrl,
			organizer,
			isOwner,
			isPartizipant
		} = state;

		return (
			<SingleEventPage
				name={name}
				photoUrl={photoUrl}
				shortDescription={shortDescription}
				startTime={new Date(startTime).toLocaleDateString()}
				endTime={new Date(endTime).toLocaleDateString()}
				contactDetails={contactDetails}
				address={address}
				organizerAvatarUrl={organizerAvatarUrl}
				organizer={organizer}
				coordinates={coordinates}
				description={description}
				isOwner={isOwner}
				isPartizipant={isPartizipant}
				onJoin={this.onJoin}
				onReject={this.onReject}
				onModify={this.onModify}
			/>
		);
	}
}

export default withStore(SingleEvent);