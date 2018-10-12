import {Link} from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import {device} from '../../styles/utilities/device';

import {ROUTES} from '../routes/routes';
import zindex from '../common/zindex';

export default function Nav() {
	return (
		<StyledNav landing={location.pathname === ROUTES.LANDING}>
			<Link to={ROUTES.LANDING} key={'home'}>
				OPENRECORD
			</Link>
		</StyledNav>
	);
}

const StyledNav = styled.nav`
	background: ${props => (props.landing ? 'transparent' : 'rgb(25, 25, 25)')};
	padding: 1rem 0;
	position: fixed;
	width: 100%;
	text-align: center;
	z-index: ${zindex('nav')};

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

	@media ${device.small} {
		display: ${props => (props.landing ? 'inherit' : 'none')};
	}
`;
