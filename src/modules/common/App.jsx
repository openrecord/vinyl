import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import styled from 'styled-components';

import HomeContainer from '../home/HomeContainer';
import HealthContainer from '../health/HealthContainer';
import RegisterContainer from '../register/RegisterContainer';

// Import common styles
import './styles/base.scss';

export default function App({history}) {
	const Nav = styled.nav`
		margin: 14px;
		position: relative;
		text-align: left;
		z-index: 5;

		a {
			color: white;
			position: relative;
			display: inline-block;
			font-size: 1.5rem;
			font-weight: 700;
			margin: 8px;
			position: relative;

			&:hover {
				text-decoration: underline;
			}

			&.contribute-link {
				float: right;
			}
		}
	`;

	return (
		<ConnectedRouter history={history}>
			<div>
				<Nav>
					<Link className="home-link" to={'/'}>
						OPENRECORD
					</Link>
					<Link className="contribute-link" to={'/register'}>
						ASK TO CONTRIBUTE
					</Link>
				</Nav>
				<Switch>
					<Route exact path="/" component={HomeContainer} />
					<Route exact path="/register" component={RegisterContainer} />

					<Route render={() => <div>Route does not exist!</div>} />
				</Switch>
			</div>
		</ConnectedRouter>
	);
}
