import { State } from 'statty';

let initialState = {
	userLogged: false
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