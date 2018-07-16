import {connect} from 'react-redux';

import Admin from './Admin';
import * as authActions from '../auth';
import * as healthActions from '../health';

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => {
	/**
	 * @param {RegisterDTO} registerDto
	 */
	const submitRegister = registerDto => {
		dispatch(authActions.register(registerDto));
	};

	const healthCheck = () => {
		dispatch(healthActions.checkApiHealth());
	};

	const refreshToken = () => {
		dispatch(authActions.refreshToken());
	};

	return {submitRegister, healthCheck, refreshToken};
};

const AdminContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Admin);

export default AdminContainer;
