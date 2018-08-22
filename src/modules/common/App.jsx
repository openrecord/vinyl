import './styles/base.scss';

import {ConnectedRouter} from 'connected-react-router';
import {Route, Switch} from 'react-router-dom';
import React from 'react';

import ROUTES from '../routes/routes';
import PrivateRoute from '../routes/PrivateRoute';
import Landing from '../landing/Landing';
import Nav from '../nav/NavContainer';
import ProfileContainer from '../profile/ProfileContainer';
import RegisterContainer from '../register/RegisterContainer';
import UniPlayerContainer from '../uniplayer/UniplayerContainer';
import LoginContainer from '../login/LoginContainer';

export default function App({history}) {
	return (
		<ConnectedRouter history={history}>
			<div>
				<Nav />
				<Switch>
					<Route path={ROUTES.LOGIN} component={LoginContainer} />
					<Route exact path={ROUTES.LANDING} component={Landing} />
					<Route exact path={ROUTES.REGISTER} component={RegisterContainer} />
					<Route exact path={ROUTES.PROFILE} component={ProfileContainer} />
					<Route path={ROUTES.PLAYER} component={UniPlayerContainer} />
					<PrivateRoute path="/private" render={() => <div>This is a private route!</div>} />
					<Route render={() => <div>Route does not exist!</div>} />
				</Switch>
			</div>
		</ConnectedRouter>
	);
}
