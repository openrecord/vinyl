import React from 'react';
import {string, object} from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {ROUTES} from '../routes/routes';
import Queue from '../queue/components/QueueContainer';

const LoggedOutLinks = () => (
	<>
		<Link to={ROUTES.LANDING} key={'home'}>
			OPENRECORD
		</Link>
		<Link to={ROUTES.REGISTER} key={'register'}>
			SIGN UP
		</Link>
		<Queue />
	</>
);

const LoggedInLinks = () => (
	<>
		<Link to={ROUTES.HOME} key={'home'}>
			OPENRECORD
		</Link>
		<Link to={ROUTES.PROFILE} key={'profile'}>
			PROFILE
		</Link>
		<Queue />
	</>
);

const StyledNav = styled.nav`
	margin: 24px 34px 0 34px;
	pointer-events: none;
	position: relative;
	text-align: left;

	* {
		pointer-events: all;
	}

	a {
		color: white;
		position: relative;
		display: inline-block;
		font-size: 1.25rem;
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

export default function Nav({user}) {
	return <StyledNav className="nav">{user ? <LoggedInLinks /> : <LoggedOutLinks />}</StyledNav>;
}

Nav.propTypes = {
	user: object
};
