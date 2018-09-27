import {Link} from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import {ROUTES} from '../routes/routes';

export default function Nav() {
	return (
		<StyledNav transparent={location.pathname === ROUTES.LANDING} className="nav">
			<Link to={ROUTES.LANDING} key={'home'}>
				OPENRECORD
			</Link>
		</StyledNav>
	);
}

const StyledNav = styled.nav`
	background: ${props => (props.transparent ? 'transparent' : 'rgb(25, 25, 25)')};
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
