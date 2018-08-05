import AuthApi from './AuthApi';
import {push} from 'connected-react-router';

// Actions
const REGISTER_REQ = 'auth/REGISTER_REQ';
const REGISTER_REQ_SUCCESS = 'auth/REGISTER_REQ_SUCCESS';
const REGISTER_REQ_FAIL = 'auth/REGISTER_REQ_FAIL';

// Initial State
const INITIAL_STATE = {user: null};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
	switch (action.type) {
		case REGISTER_REQ_SUCCESS: {
			const {user} = action.payload;
			return {
				...state,
				user
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
			dispatch(push('/profile'));
		} catch (err) {
			dispatch({type: REGISTER_REQ_FAIL, payload: {err}});
		}
	};
}
