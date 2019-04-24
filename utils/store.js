import { State } from 'statty';
import Firebase from './firebase';

let initialState = {
	userLogged: false,
	showLoader: false
};

const reducer = ( state, action ) => {
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
		render={(store, update) => { // eslint-disable-line
			const dispatchShort = (...args) => { update(dispatch(...args)); };

			return (
				<Firebase {...{ store, dispatch: dispatchShort }} >
					<Component
						{...props}
						{...{ store, dispatch: dispatchShort }}
					/>
				</Firebase>
			);
		}}
	/>
);

export { initialState, withStore };