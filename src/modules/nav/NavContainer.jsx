import React from 'react';
import {string, object} from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const ROUTES = {
	HOME: '/',
	REGISTER: '/register',
	PROFILE: '/profile'
};

export default class Nav extends React.Component {
	static propTypes = {
		user: object
	};

	render() {
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

				&:nth-child(2) {
					float: right;
				}
			}
		`;

		return <Nav>{this._renderLinks()}</Nav>;
	}

	_renderLinks() {
		return this.props.user ? this._loggedInLinks() : this._loggedOutLinks();
	}

	_loggedOutLinks() {
		return (
			<>
				<Link to={ROUTES.HOME} key={'home'}>
					OPENRECORD
				</Link>
				<Link to={ROUTES.REGISTER} key={'register'}>
					ASK TO CONTRIBUTE
				</Link>
			</>
		);
	}

	_loggedInLinks() {
		return (
			<>
				<Link to={ROUTES.HOME} key={'home'}>
					OPENRECORD
				</Link>
				<Link to={ROUTES.PROFILE} key={'profile'}>
					PROFILE
				</Link>
			</>
		);
	}
}
