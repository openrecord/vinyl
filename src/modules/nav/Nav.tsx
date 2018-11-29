import * as React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {device} from '../../styles/utilities/device';
import zindex from '../common/zindex';
import {ROUTES} from '../routes/routes';

interface $StyledNavProps {
	landing: boolean;
}

export default function Nav() {
	return (
		<StyledNav landing={location.pathname === ROUTES.LANDING}>
			<Link to={ROUTES.LANDING}>OPENRECORD</Link>
		</StyledNav>
	);
}

const StyledNav = styled.nav`
	background: 'transparent';
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
		display: ${(props: $StyledNavProps) => (props.landing ? 'inherit' : 'none')};
	}
`;
