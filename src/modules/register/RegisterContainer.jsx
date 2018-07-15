import React from 'react';
import {connect} from 'react-redux';

import Register from './Register.jsx';
import * as authActions from '../auth';
import * as healthActions from '../health';

const mapStateToProps = (state, props) => ({auth: state.auth});

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

	return {submitRegister, healthCheck};
};

const RegisterContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);

export default RegisterContainer;
