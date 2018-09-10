import React from 'react';
import {string, object} from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {ROUTES} from '../routes/routes';

const LoggedOutLinks = () => (
	<>
		<Link to={ROUTES.LANDING} key={'home'}>
			OPENRECORD
		</Link>
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
	</>
);

const StyledNav = styled.nav`
	margin: 24px 34px 0 34px;
	pointer-events: none;
	position: fixed;
	text-align: left;

	a {
		color: white;
		position: relative;
		display: inline-block;
		font-size: 1.25rem;
		font-weight: 700;
		margin: 8px;
		pointer-events: all;
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
