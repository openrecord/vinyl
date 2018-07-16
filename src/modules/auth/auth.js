import AuthApi from './AuthApi';

// Actions
const REGISTER_REQ = 'auth/REGISTER_REQ';
const REGISTER_REQ_SUCCESS = 'auth/REGISTER_REQ_SUCCESS';
const REGISTER_REQ_FAIL = 'auth/REGISTER_REQ_FAIL';

const REFRESH_REQ = 'auth/REFRESH_REQ';
const REFRESH_REQ_SUCCESS = 'auth/REFRESH_REQ_SUCCESS';
const REFRESH_REQ_FAIL = 'auth/REFRESH_REQ_FAIL';

// Initial State
const INITIAL_STATE = {token: null};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
	switch (action.type) {
		case REFRESH_REQ_SUCCESS:
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
		} catch (err) {
			dispatch({type: REGISTER_REQ_FAIL, payload: {err}});
		}
	};
}

export function refreshToken() {
	return async dispatch => {
		dispatch({type: REFRESH_REQ});
		try {
			const payload = await AuthApi.refreshToken();
			dispatch({type: REFRESH_REQ_SUCCESS, payload});
		} catch (err) {
			console.error(err.message);
			dispatch({type: REFRESH_REQ_FAIL, payload: {err}});
		}
	};
}

/*
function createAsyncApiAction(apiFunction, requestAction, successAction, failAction) {
	return async dispatch => {
		dispatch({type: requestAction});
		try {
			const payload = await apiFunction(...arguments);
			dispatch({type: successAction, payload});
		} catch (err) {
			dispatch({type: failAction, payload: {err}});
		}
	};
}
*/
