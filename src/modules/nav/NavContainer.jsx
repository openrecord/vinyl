import React from 'react';
import {string, object} from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {ROUTES} from '../common/routes';

const LoggedOutLinks = () => (
	<>
		<Link to={ROUTES.LANDING} key={'home'}>
			OPENRECORD
		</Link>
		<Link to={ROUTES.REGISTER} key={'register'}>
			ASK TO CONTRIBUTE
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

export default function Nav({user}) {
	return <StyledNav>{user ? <LoggedInLinks /> : <LoggedOutLinks />}</StyledNav>;
}

Nav.propTypes = {
	user: object
};
