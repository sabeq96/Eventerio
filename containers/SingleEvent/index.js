import { Component } from 'preact';
import { route } from 'preact-router';
import Firebase from '../../utils/firebase';
import { actions, withStore } from '../../utils/store';
import SingleEventPage from '../../components/Pages/SingleEvent';
import _some from 'lodash/some';

class SingleEvent extends Component {
	onJoin = () => {
		Firebase.takePartizipation({ id: this.props.eventId }).then((res) => {
			console.log(res);
		}).catch((err) => {
			console.log(err);
		});
	}

	onReject = () => {
		Firebase.rejectPartizipation({ id: this.props.eventId }).then((res) => {
			console.log(res);
		}).catch((err) => {
			console.log(err);
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
				startTime={new Date(startTime*1000).toLocaleDateString()}
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