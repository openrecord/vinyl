import {VelocityComponent} from 'velocity-react';
import React from 'react';
import styled, {css} from 'styled-components';

import {FOOTER_HEIGHT_DESKTOP, FOOTER_HEIGHT_MOBILE} from '../../controls/components/constants';
import {device} from '../../../styles/utilities/device';
import Player from './Player';
import zindex from '../../common/zindex';

export default class PlayerBox extends React.Component {
	render() {
		const {currentlyPlaying, expanded, toggleExpanded, togglePlaying, ...props} = this.props;

		if (!currentlyPlaying) {
			return null;
		}

		return (
			<VelocityComponent
				animation={{backgroundColorAlpha: expanded ? 1 : 0}}
				delay={50}
				duration={200}
			>
				<Positioning expanded={expanded} onClick={expanded ? togglePlaying : toggleExpanded}>
					<IFrameBlocker />
					<SizingHack expanded={expanded}>
						{currentlyPlaying.info.source === 'SOUNDCLOUD' ? (
							<SoundCloudArt expanded={expanded} src={getTrackThumbnail(currentlyPlaying)} />
						) : null}
						<Player currentlyPlaying={currentlyPlaying} {...props} togglePlaying={togglePlaying} />
					</SizingHack>
				</Positioning>
			</VelocityComponent>
		);
	}
}

function getTrackThumbnail(track) {
	var trackID = track.info.thumbnail.split('large.jpg')[0];
	if (track.info.source === 'SOUNDCLOUD') {
		return '' + trackID + 't500x500.jpg';
	}
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

					${IFrameBlocker} {
						display: none;
					}
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

const SoundCloudArt = styled.img`
	height: 100%;
	width: 56.25%;

	${props =>
		props.expanded
			? css`
					position: absolute;
					overflow: hidden;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					max-width: 40rem;
					max-height: 40rem;
			  `
			: css`
					float: right;
			  `};
`;

const SizingHack = styled.div`
	transition: all linear 0.3s;

	/* For hiding SC Embeds in favor of Thumbnails*/
	.sc-hide {
		display: none;
	}
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

function getTrackUrl(track) {
	if (track.info.source === 'YOUTUBE') {
		return 'https://www.youtube.com/watch?v=' + track.info.url;
	}
}
