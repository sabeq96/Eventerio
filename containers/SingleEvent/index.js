import { Component } from 'preact';
import Firebase from '../../utils/firebase';
import { actions, withStore } from '../../utils/store';
import SingleEventPage from '../../components/Pages/SingleEvent';

class SingleEvent extends Component {

	constructor(props) {
		super(props);

		this.state = {
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
			comments: [],
			error: ''
		};
	}

	componentDidMount() {
		const { eventId, dispatch } = this.props;

		if (eventId) {
			dispatch({ type: actions.SHOW_LOADER, showLoader: true });

			Firebase.getEvent(eventId).then((event) => {
				this.setState(event, () => {
					Firebase.getEventOrganizer(event.userId).then((user) => {
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
		const { name, photoUrl, shortDescription, startTime, endTime, contactDetails, address, coordinates, description, organizerAvatarUrl, organizer } = state;
		
		return (
			<SingleEventPage
				name={name}
				photoUrl={photoUrl}
				shortDescription={shortDescription}
				startTime={new Date(startTime*1000).toLocaleDateString()}
				endTime={new Date(endTime*1000).toLocaleDateString()}
                contactDetails={contactDetails}
				address={address}
				organizerAvatarUrl={organizerAvatarUrl}
				organizer={organizer}
				coordinates={coordinates}
				description={description}
			/>
		);
	}
}

export default withStore(SingleEvent);