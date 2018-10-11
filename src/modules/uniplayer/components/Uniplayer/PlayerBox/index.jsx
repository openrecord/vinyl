import React from 'react';
import styled from 'styled-components';

import {device} from '../../../../../styles/utilities/device';
import Player from './Player';

export default function PlayerBox(props) {
	return (
		<StyledPlayerBox>
			<IFrameBlocker className="iframeblocker" />
			<Player {...props} />
		</StyledPlayerBox>
	);
}

const IFrameBlocker = styled.div`
	background: rgba(0, 0, 0, 0);
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	transition: all 0.1s;
`;

const StyledPlayerBox = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	height: 5rem;
	width: 8.875rem;
	overflow: hidden;

	iframe + div {
		height: 250% !important;
		position: relative;
		top: -75%;
	}

	@media ${device.small} {
		height: 4.5rem;
	}
`;
