import {VelocityComponent} from 'velocity-react';
import React from 'react';
import styled, {css} from 'styled-components';

import {FOOTER_HEIGHT_DESKTOP, FOOTER_HEIGHT_MOBILE} from '../../controls/components/constants';
import {device} from '../../../styles/utilities/device';
import Player from './Player';
import zindex from '../../common/zindex';

export default function PlayerBox({expanded, toggleExpanded, togglePlaying, ...props}) {
	return (
		<VelocityComponent
			animation={{backgroundColorAlpha: expanded ? 1 : 0}}
			delay={50}
			duration={200}
		>
			<Positioning expanded={expanded} onClick={expanded ? togglePlaying : toggleExpanded}>
				<IFrameBlocker />
				<SizingHack expanded={expanded}>
					<Player {...props} togglePlaying={togglePlaying} />
				</SizingHack>
			</Positioning>
		</VelocityComponent>
	);
}

const Positioning = styled.div`
	position: fixed;
	bottom: 0;
	right: 0;
	overflow: hidden;
	transition: all linear 0.3s;
	background-color: rgb(25, 25, 25);

	[data-style-id='react-player'] > div {
		height: 250% !important;
		transform: translateY(-30%);
	}

	${props =>
		props.expanded
			? css`
					width: 100%;
					height: 100%;
					z-index: ${zindex('player-expanded')};
			  `
			: css`
					z-index: ${zindex('player')};
					height: ${FOOTER_HEIGHT_DESKTOP};
					width: 8.875rem;
					overflow: hidden;

					@media ${device.small} {
						height: ${FOOTER_HEIGHT_MOBILE};
						bottom: ${FOOTER_HEIGHT_MOBILE};
					}
			  `};
`;

const IFrameBlocker = styled.div`
	background: rgba(0, 0, 0, 0);
	cursor: pointer;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	z-index: ${zindex('iframeblocker')};
	transition: all linear 0.3s;
`;

const SizingHack = styled.div`
	transition: all linear 0.3s;
	${props =>
		props.expanded
			? css`
					padding-bottom: 50.5%;
					position: relative;
					overflow: hidden;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);

					[data-style-id='react-player'] {
						position: absolute;
					}

					@media ${device.small} {
						width: 100%;
					}
			  `
			: css`
					height: ${FOOTER_HEIGHT_DESKTOP};
					padding-bottom: 0;
					position: relative;
					width: 100%;
					left: 0;
					top: 0;
					transform: none;
			  `};
`;
