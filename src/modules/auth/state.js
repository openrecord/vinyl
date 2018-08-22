import AuthApi from './AuthApi';
import {push} from 'connected-react-router';

// Actions
const REGISTER_REQ = 'auth/REGISTER_REQ';
const REGISTER_REQ_SUCCESS = 'auth/REGISTER_REQ_SUCCESS';
const REGISTER_REQ_FAIL = 'auth/REGISTER_REQ_FAIL';
const LOGIN_REQ = 'auth/LOGIN_REQ';
const LOGIN_REQ_SUCCESS = 'auth/LOGIN_REQ_SUCCESS';
const LOGIN_REQ_FAIL = 'auth/LOGIN_REQ_FAIL';
const AUTHENTICATE_REQ = 'auth/AUTHENTICATE_REQ';
const AUTHENTICATE_REQ_SUCCESS = 'auth/AUTHENTICATE_REQ_SUCCESS';
const AUTHENTICATE_REQ_FAIL = 'auth/AUTHENTICATE_REQ_FAIL';

// Initial State
const INITIAL_STATE = {user: null};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
	switch (action.type) {
		case REGISTER_REQ_SUCCESS:
		case AUTHENTICATE_REQ_SUCCESS:
		case LOGIN_REQ_SUCCESS:
			const {user} = action.payload;
			return {
				...state,
				user
			};

		case AUTHENTICATE_REQ_FAIL:
		case LOGIN_REQ_FAIL:
			const {err} = action.payload;
			return {
				...state,
				user: null
			};

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

/**
 * @param {LoginDTO} loginDto
 * @return {function}
 */
export function login(loginDto) {
	return async dispatch => {
		dispatch({type: LOGIN_REQ});
		try {
			const payload = await AuthApi.login(loginDto);
			dispatch({type: LOGIN_REQ_SUCCESS, payload});
			dispatch(push('/profile'));
		} catch (err) {
			dispatch({type: LOGIN_REQ_FAIL, payload: {err}});
		}
	};
}

/**
 * @return {function}
 */
export function authenticate() {
	return async dispatch => {
		dispatch({type: AUTHENTICATE_REQ});
		try {
			const payload = await AuthApi.authenticate();
			dispatch({type: AUTHENTICATE_REQ_SUCCESS, payload});
		} catch (err) {
			dispatch({type: AUTHENTICATE_REQ_FAIL, payload: {err}});
		}
	};
}
