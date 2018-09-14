import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React from 'react';

import {ROUTES} from '../routes/routes';
import Landing from '../landing/Landing';
import Nav from '../nav/NavContainer';
import ProfileContainer from '../profile/ProfileContainer';
import RegisterContainer from '../register/RegisterContainer';
import UniPlayerContainer from '../uniplayer/UniplayerContainer';

export default function App() {
	return (
		<BrowserRouter>
			<div>
				<Nav />
				<Switch>
					<Route exact path={ROUTES.LANDING} component={Landing} />
					<Route exact path={ROUTES.REGISTER} component={RegisterContainer} />
					<Route exact path={ROUTES.PROFILE} component={ProfileContainer} />
					<Route path={ROUTES.PLAYER} component={UniPlayerContainer} />
					<Route render={() => <div>Route does not exist!</div>} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}
