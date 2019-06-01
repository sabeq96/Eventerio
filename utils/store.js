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
	SHOW_LOGIN_MODAL: 'SHOW_LOGIN_MODAL',
	SHOW_ACTION_RESULT_MODAL: 'SHOW_ACTION_RESULT_MODAL'
};

const reducer = ( state, action ) => {
	switch (action.type) {
		case actions.LOGIN:
			return {
				...state,
				user: action.user
			};
      
		case actions.LOGOUT:
			return {
				...state,
				user: null
			};

		case actions.SHOW_LOADER:
			return {
				...state,
				showLoader: action.showLoader
			};

		case actions.SHOW_LOGIN_MODAL:
			return {
				...state,
				modalType: action.modalType
			};

		case actions.SHOW_ACTION_RESULT_MODAL:
			return {
				...state,
				actionResultModalType: action.actionResultModalType,
				actionResultModalMessage: action.actionResultModalMessage
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