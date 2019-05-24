import { Component } from 'preact';
import 'style';
import EventsHelper from '../../utils/eventsHelper';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render(props, state) {
		EventsHelper.getEventsInArea(41.881832, -87.623177, 100);
		return (
			<div className="container">
				Home Page
			</div>
		);
	}
}

const styles = {};

export default Home;