import AuthApi from './AuthApi';

// Actions
const REGISTER_REQ = 'auth/REGISTER_REQ';
const REGISTER_REQ_SUCCESS = 'auth/REGISTER_REQ_SUCCESS';
const REGISTER_REQ_FAIL = 'auth/REGISTER_REQ_FAIL';

// Initial State
const INITIAL_STATE = {token: null};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
	switch (action.type) {
		case REGISTER_REQ_SUCCESS: {
			const {token} = action.payload;
			return {
				...state,
				token
			};
		}

		default:
			return state;
	}
}

// Action Creators

/**
 * @param {RegisterDTO} registerDto
 * @return {function}
 */
export function register(registerDto) {
	return async dispatch => {
		dispatch({type: REGISTER_REQ});
		try {
			const payload = await AuthApi.register(registerDto);
			dispatch({type: REGISTER_REQ_SUCCESS, payload});
		} catch (err) {
			dispatch({type: REGISTER_REQ_FAIL, payload: {err}});
		}
	};
}
