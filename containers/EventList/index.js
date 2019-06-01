import { Component } from 'preact';
import EventsHelper from '../../utils/eventsHelper';
import Firebase from '../../utils/firebase';
import EventListPage from '../../components/Pages/EventList';
import { withStore, actions } from '../../utils/store';

class EventList extends Component {
	getEventsInArea = (eventsMaxDistance) => {
		EventsHelper.getEventsInArea(eventsMaxDistance).then((eventList) => {
			this.setState({ eventList });
		}).catch((error) => {
			this.setState({ error });
		});
	}

	constructor(props) {
		super(props);

		this.state = {
			eventList: [],
			error: ''
		};
	}

	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(actions.SHOW_LOADER, { showLoader: true });
		Firebase.getUser().then((user) => {
			const { eventsMaxDistance } = user.settings;
			this.getEventsInArea(eventsMaxDistance);
		}).catch(() => {
			this.getEventsInArea(30);
		}).finally(() => {
			dispatch(actions.SHOW_LOADER, { showLoader: false });
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