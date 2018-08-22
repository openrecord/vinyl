import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

import ROUTES from './routes';
import React from 'react';

const PrivateRouteComponent = ({component: Component, loggedIn, ...rest}) => (
	<Route {...rest} render={props => (loggedIn ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN} />)} />
);

const mapStateToProps = state => ({
	loggedIn: !!state.auth.user
});

const PrivateRoute = connect(mapStateToProps)(PrivateRouteComponent);

export default PrivateRoute;
