import { State } from 'statty';

let initialState = {
	userLogged: false,
	showLoader: false,
	showLoginModal: false
};

const reducer = ( state, action ) => {
	console.log(action);
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				userLogged: true
			};
      
		case 'LOGOUT':
			return {
				...state,
				userLogged: false
			};

		case 'SHOW_LOADER':
			return {
				...state,
				showLoader: action.showLoader
			};

		case 'SHOW_LOGIN_MODAL':
			return {
				...state,
				showLoginModal: action.showLoginModal
			};
      
		default:
			return {
				...state
			};
	}
};

const dispatch = action => state => reducer(state, action);

const withStore = (Component) => (props) => (
	<State
		render={({ ...store }, update) => ( // eslint-disable-line
			<Component
				{...props}
				{...{ store, dispatch: (...args) => { update(dispatch(...args)); } }}
			/>
		)}
	/>
);

export { initialState, withStore };