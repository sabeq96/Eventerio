import { Component } from 'preact';
import AddModEventPage from '../../components/Pages/AddModEvent';

import { withStore, actions } from '../../utils/store';
import Firebase from '../../utils/firebase';
	
class AddModEvent extends Component {
	onConfirm = (payload) => {
		const { dispatch } = this.props;
		dispatch({ type: actions.SHOW_LOADER, showLoader: true });
		Firebase.updateEvent(payload).then((resp) => {
			// console.log(resp);
		}).catch((err) => {
			// console.log(err);
		}).finally(() => {
			dispatch({ type: actions.SHOW_LOADER, showLoader: false });
		});
	}

	constructor(props) {
		super(props);

		this.state = {
			edit: false
		};
	}

	componentDidMount() {
		let params = new URL(document.location).searchParams;
		if (params.get('id')) {
			// get event data id & save to state & pass as props to page
		}
	}

	render({ store: {} }, { edit }) {
		return (
			<AddModEventPage
				onConfirm={this.onConfirm}
				edit={edit}
			/>
		);
	}
}

export default withStore(AddModEvent);
