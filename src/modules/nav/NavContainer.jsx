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

export default function Nav({user}) {
	return <StyledNav className="nav">{user ? <LoggedInLinks /> : <LoggedOutLinks />}</StyledNav>;
}

Nav.propTypes = {
	user: object
};

const StyledNav = styled.nav`
	background: rgb(25, 25, 25);
	padding: 1rem 0;
	position: fixed;
	width: 100%;
	text-align: center;

	a {
		display: inline-block;
		cursor: pointer;

		color: white;
		font-size: 1.25rem;
		letter-spacing: 0.0675rem;
		position: relative;

		transition: all 0.1s;
		transition: all 0.1s;
		vertical-align: middle;

		&:hover {
			text-decoration: underline;
		}
	}
`;
