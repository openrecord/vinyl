import React from 'react';
import styled from 'styled-components';

import {device} from '../../../../../styles/utilities/device';
import Player from './Player';
import ExpandButton from '../ExpandButton';

export default function PlayerBox({expanded, toggleExpanded, ...props}) {
	if (expanded) {
		return (
			<RightCenter>
				<ExpandButton onClick={toggleExpanded} />
				<FullScreen>
					<IFrameBlocker />
					<SizingHack>
						<Player {...props} />
					</SizingHack>
				</FullScreen>
			</RightCenter>
		);
	}
	return (
		<Inline>
			<IFrameBlocker onClick={toggleExpanded} />
			<Player {...props} />
		</Inline>
	);
}

const IFrameBlocker = styled.div.attrs({className: 'iframeblocker'})`
	background: rgba(0, 0, 0, 0);
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	transition: all 0.1s;
`;

const FullScreen = styled.div.attrs({className: 'fullscreen-player'})`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	background: rgb(25, 25, 25);

	[data-style-id='react-player'] {
		height: 250% !important;
		position: relative;
		top: -75%;
	}
`;

const SizingHack = styled.div`
	padding-bottom: 50.5%;
	position: relative;
	overflow: hidden;
	width: 90%;
	left: 5%;
	top: 50%;
	transform: translateY(calc(-50% - 1.875rem));

	[data-style-id='react-player'] {
		position: absolute;
	}

	@media ${device.small} {
		width: 100%;
		left: 0;
	}
`;

const Inline = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	height: 5rem;
	width: 8.875rem;
	overflow: hidden;

	[data-style-id='react-player'] {
		height: 250% !important;
		position: relative;
		top: -75%;
	}

	@media ${device.small} {
		height: 4.5rem;
	}
`;

const RightCenter = styled.div`
	position: absolute;
	right: 0;

	${ExpandButton} {
		margin-right: 1.5rem;
	}
`;
