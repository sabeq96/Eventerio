import { State } from 'statty';

let initialState = {
	userLogged: false,
	showLoader: false,
	showLoginModal: false
};

const actions = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	SHOW_LOADER: 'SHOW_LOADER',
	SHOW_LOGIN_MODAL: 'SHOW_LOGIN_MODAL'
};

const reducer = ( state, action ) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				user: action.user
			};
      
		case 'LOGOUT':
			return {
				...state,
				user: null
			};

		case 'SHOW_LOADER':
			return {
				...state,
				showLoader: action.showLoader
			};

		case 'SHOW_LOGIN_MODAL':
			return {
				...state,
				modalType: action.modalType
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

export { initialState, withStore, actions };