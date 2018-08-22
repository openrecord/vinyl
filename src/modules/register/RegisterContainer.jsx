import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Register from './Register.jsx';
import * as actions from '../auth/state';

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({submitRegister: actions.register}, dispatch);

const RegisterContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);

export default RegisterContainer;
