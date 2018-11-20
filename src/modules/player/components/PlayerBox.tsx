import * as React from 'react';
import styled, { css } from 'styled-components';
import { VelocityComponent } from 'velocity-react';

import { device } from '../../../styles/utilities/device';
import zindex from '../../common/zindex';
import { FOOTER_HEIGHT_DESKTOP, FOOTER_HEIGHT_MOBILE } from '../../controls/components/constants';
import { $Track } from '../../search/components/types';
import Player, { $PlayerProps } from './Player';

interface $Props {
	currentlyPlaying: $Track | undefined;
	expanded: boolean;
	toggleExpanded(): void;
	togglePlaying(): void;
}

export default function PlayerBox({
	currentlyPlaying,
	expanded,
	toggleExpanded,
	togglePlaying,
	...props
}: $Props & $PlayerProps) {
	if (!currentlyPlaying) {
		return null;
	}

	const isSoundCloud = currentlyPlaying.info.source === 'SOUNDCLOUD';
	return (
		<VelocityComponent
			animation={{backgroundColorAlpha: expanded ? 1 : 0}}
			delay={20}
			duration={100}
		>
			<Positioning expanded={expanded} onClick={expanded ? togglePlaying : toggleExpanded}>
				<IFrameBlocker />
				<SizingHack expanded={expanded} isSoundCloud={isSoundCloud}>
					{isSoundCloud && getTrackThumbnail(currentlyPlaying) !== '' ? (
						<SoundCloudArt expanded={expanded} src={getTrackThumbnail(currentlyPlaying)} />
					) : isSoundCloud && getTrackThumbnail(currentlyPlaying) === '' ? (
						<NoArtwork expanded={expanded} />
					) : null}
					<Player currentlyPlaying={currentlyPlaying!} {...props} />
				</SizingHack>
			</Positioning>
		</VelocityComponent>
	);
}

function getTrackThumbnail(track: $Track) {
	var trackID;
	if (track.info.thumbnail !== null) {
		trackID = track.info.thumbnail.split('large.jpg')[0];
		if (track.info.source === 'SOUNDCLOUD') {
			return '' + trackID + 't500x500.jpg';
		}
	}
	return '';
}

interface $IsExpanded {
	expanded: boolean;
}

interface $IsSoundCloud {
	isSoundCloud: boolean;
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

	${(props: $IsExpanded) =>
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

const SoundCloudArt = styled.img`
	height: 100%;
	width: 56.25%;

	${(props: $IsExpanded) =>
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

const NoArtwork = styled.div`
	background-image: linear-gradient(135deg, #846170, #e6846e);
	height: 100%;
	width: 56.25%;

	${(props: $IsExpanded) =>
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
	${(props: $IsSoundCloud & $IsExpanded) =>
		props.isSoundCloud &&
		css`
			${Player} {
				display: none;
			}
		`} ${props =>
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
