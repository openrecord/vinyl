import React from 'react';
import {string, object} from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {ROUTES} from '../routes/routes';

const LoggedOutLinks = () => (
	<>
		<Link to={ROUTES.LANDING} key={'home'}>
			<ORLogo>
				<span />
			</ORLogo>
			<Spacer />
			<h3>openrecord.co/</h3>
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
	margin: 1.5rem 1.5rem 0 1.5rem;
	position: fixed;
	text-align: left;

	a {
		display: table;
		border-collapse: separate;
		cursor: pointer;
		transition: all 0.1s;

		&:hover {
			h3 {
				text-decoration: underline;
			}
		}

		h3 {
			color: white;
			display: table-cell;
			letter-spacing: 0.0675rem;
			position: relative;
			vertical-align: middle;
			transition: all 0.1s;
		}
	}
`;

const Spacer = styled.div`
	display: table-cell;
	width: 0.5rem;
`;

const ORLogo = styled.div`
	background: rgba(255, 255, 255, 0.01);
	border-radius: 50%;
	border: 1px solid rgba(255, 255, 255, 1);
	display: table-cell;
	height: 3rem;
	outline: none;
	position: relative;
	transition: all 0.1s;
	width: 3rem;

	span {
		background: transparent;
		border: 0.6125rem solid white;
		border-radius: 50%;
		display: inline-block;
		height: 0.1875rem;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 0.1875rem;
	}
`;
