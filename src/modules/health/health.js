import HealthApi from './HealthApi';

// Actions
const API_HEALTH_REQ = 'health/API_HEALTH_REQ';
const API_HEALTH_REQ_SUCCESS = 'health/API_HEALTH_REQ_SUCCESS';
const API_HEALTH_REQ_FAIL = 'health/API_HEALTH_REQ_FAIL';

// Initial State
const INITIAL_STATE = {
	api: null
};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
	switch (action.type) {
		case API_HEALTH_REQ_SUCCESS: {
			const {healthy} = action.payload;
			return {
				...state,
				api: healthy
			};
		}

		default:
			return state;
	}
}

// Action Creators
export function checkApiHealth() {
	return async dispatch => {
		dispatch({type: API_HEALTH_REQ});
		const payload = await HealthApi.getApiHealth();
		dispatch({type: API_HEALTH_REQ_SUCCESS, payload});
	};
}
