import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import styled from 'styled-components';

import Nav from '../nav/NavContainer';
import HomeContainer from '../home/HomeContainer';
import HealthContainer from '../health/HealthContainer';
import RegisterContainer from '../register/RegisterContainer';
import ProfileContainer from '../profile/ProfileContainer';

// Import common styles
import './styles/base.scss';

export default function App({history}) {
	return (
		<ConnectedRouter history={history}>
			<div>
				<Nav />
				<Switch>
					<Route exact path="/" component={HomeContainer} />
					<Route exact path="/register" component={RegisterContainer} />
					<Route exact path="/profile" component={ProfileContainer} />
					<Route render={() => <div>Route does not exist!</div>} />
				</Switch>
			</div>
		</ConnectedRouter>
	);
}
