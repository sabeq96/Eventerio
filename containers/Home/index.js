import { Component } from 'preact';
import 'style';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render(props, state) {
		return (
			<div className="container">
				Home Page
			</div>
		);
	}
}

const styles = {};

export default Home;