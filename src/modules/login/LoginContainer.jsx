import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Login from './Login.jsx';
import {login} from '../auth/state';

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({login}, dispatch);

const LoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

export default LoginContainer;
