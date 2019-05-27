import { Component } from 'preact';
import Firebase from '../../utils/firebase';
import EventListPage from '../../components/Pages/EventList';
import { withStore, actions } from '../../utils/store';

class EventList extends Component{
	constructor(props) {
		super(props);

		this.state = {
			eventList: []
		};
	}

	componentDidMount() {
		const { dispatch } = this.props;
		const longitude = 0; // getLong
		const latitude = 0; // getLatt
		dispatch(actions.SHOW_LOADER, { showLoader: true });

		Firebase.getEventListByLocation({ latitude, longitude }).then((eventList) => {
			this.setState({ eventList });
		}).catch((err) => {
			console.log(err);
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