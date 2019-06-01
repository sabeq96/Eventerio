import { Component } from 'preact';
import EventsHelper from '../../utils/eventsHelper';
import Firebase from '../../utils/firebase';
import EventListPage from '../../components/Pages/EventList';
import { withStore, actions } from '../../utils/store';

class EventList extends Component{
	constructor(props) {
		super(props);

		this.state = {
			eventList: [],
			error: ''
		};
	}

	componentDidMount() {
		const { dispatch } = this.props;

		Firebase.auth.onAuthStateChanged((user) => { // TODO: Remove this condition, when only authenticated users will have access
			if (user) {
				dispatch(actions.SHOW_LOADER, { showLoader: true });
				Firebase.getUser().then((user) => {
					const { eventsMaxDistance } = user.settings;
					EventsHelper.getEventsInArea(eventsMaxDistance).then((eventList) => {
						this.setState({ eventList });
					}).catch((error) => {
						this.setState({ error });
					});
				}).catch((error) => {
					this.setState({ error });
				}).finally(() => {
					dispatch(actions.SHOW_LOADER, { showLoader: false });
				});
			}
		});
	}

	render(props, state) {
		return (
			<EventListPage
				eventList={state.eventList}
			/>
		);
	}
}

export default withStore(EventList);