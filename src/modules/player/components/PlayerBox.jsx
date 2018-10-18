import * as React from 'react';
import styled, {css} from 'styled-components';

import {FOOTER_HEIGHT_DESKTOP, FOOTER_HEIGHT_MOBILE} from '../../controls/components/constants';
import {device} from '../../../styles/utilities/device';
import Player from './Player';
import zindex from '../../common/zindex';

export default function PlayerBox({expanded, toggleExpanded, togglePlaying, ...props}) {
	return (
		<Positioning expanded={expanded} onClick={expanded ? togglePlaying : toggleExpanded}>
			<IFrameBlocker />
			<SizingHack expanded={expanded}>
				<Player {...props} togglePlaying={togglePlaying} />
			</SizingHack>
		</Positioning>
	);
}

const Positioning = styled.div`
	position: fixed;

	[data-style-id='react-player'] > div {
		height: 250% !important;
		transform: translateY(-30%);
	}

	${props =>
		props.expanded
			? css`
					bottom: 0;
					left: 0;
					right: 0;
					top: 0;
					z-index: ${zindex('player-expanded')};
					background: rgb(25, 25, 25);
			  `
			: css`
					bottom: 0;
					right: 0;
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
	transition: all 0.1s;
`;

const SizingHack = styled.div`
	${props =>
		props.expanded
			? css`
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
			  `
			: css`
					height: ${FOOTER_HEIGHT_DESKTOP};
			  `};
`;
