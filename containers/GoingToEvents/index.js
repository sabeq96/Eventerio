import { Component } from 'preact';
import Firebase from '../../utils/firebase';
import EventListPage from '../../components/Pages/EventList';
import { withStore, actions } from '../../utils/store';

class GoingToEvents extends Component{
	constructor(props) {
		super(props);

		this.state = {
			eventList: []
		};
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(actions.SHOW_LOADER, { showLoader: true });

		Firebase.goingToEvents().then((eventList) => {
			console.log(eventList);
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

export default withStore(GoingToEvents);