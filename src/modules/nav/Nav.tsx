import {Link} from 'react-router-dom';
import * as React from 'react';
import styled, {css} from 'styled-components';
import {device} from '../../styles/utilities/device';

import {ROUTES} from '../routes/routes';
import zindex from '../common/zindex';
import ToggleExpanded from '../common/mutations/ToggleExpanded';
import Record from './Record';

interface $Props {
	expanded: boolean;
}

interface $StyledNavProps {
	expanded: boolean;
	landing: boolean;
}

export default function Nav({expanded}: $Props) {
	return (
		<StyledNav expanded={expanded} landing={location.pathname === ROUTES.LANDING}>
			<Link to={ROUTES.LANDING} key={'home'}>
				<Record />
				OPENRECORD.co{location.pathname}
			</Link>
		</StyledNav>
	);
}

const StyledNav = styled.nav`
	background: ${(props: $StyledNavProps) =>
		props.expanded || props.landing ? 'transparent' : 'rgb(25,25,25)'};
	padding: 1rem 1.5rem;
	position: fixed;
	width: 100%;
	text-align: center;
	z-index: ${zindex('nav')};

	a {
		display: flex;
		cursor: pointer;
		align-items: center;
		color: white;
		font-size: 1.25rem;
		font-family: 'Haas Med';
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
