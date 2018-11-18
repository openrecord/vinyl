import * as React from 'react';
import styled, {css} from 'styled-components';
import {VelocityComponent} from 'velocity-react';

import {device} from '../../../styles/utilities/device';
import zindex from '../../common/zindex';
import {$Track} from '../../search/components/types';
import Player, {$PlayerProps} from './Player';
import ControlsContainer from '../../controls/components/ControlsContainer';

interface $Props {
	currentlyPlaying: $Track | null;
	expanded: boolean;
	toggleExpanded(): void;
	togglePlaying(): void;
}

export default function PlayerBox({currentlyPlaying, expanded, ...props}: $Props & $PlayerProps) {
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
			<Positioning>
				<IFrameBlocker />
				<ActiveMediaBox>
					<SizingHack expanded={expanded} isSoundCloud={isSoundCloud}>
						<PlayerHolder>
							{isSoundCloud && getTrackThumbnail(currentlyPlaying) !== '' ? (
								<SoundCloudArt expanded={expanded} src={getTrackThumbnail(currentlyPlaying)} />
							) : isSoundCloud && getTrackThumbnail(currentlyPlaying) === '' ? (
								<NoArtwork expanded={expanded} />
							) : null}
							<Player currentlyPlaying={currentlyPlaying} {...props} />
						</PlayerHolder>
					</SizingHack>
					<ControlsContainer />
				</ActiveMediaBox>
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
	overflow: hidden;
	transition: all linear 0.3s;
	background: none !important;

	[data-style-id='react-player'] > div {
		height: 250% !important;
		transform: translateY(-30%);
	}

	z-index: ${zindex('player')};
	width: calc(70% - 1.5rem);
`;

const IFrameBlocker = styled.div`
	background: rgba(0, 0, 0, 0);
	cursor: pointer;
	position: absolute;
	display: none;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	z-index: ${zindex('iframeblocker')};
	transition: all linear 0.3s;
`;

const SoundCloudArt = styled.img`
	height: 100%;
	position: absolute;
	width: 56.25%;
	left: 50%;
	transform: translateX(-50%);

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
			: css``};
`;

const NoArtwork = styled.div`
	background-image: linear-gradient(135deg, #846170, #e6846e);
	height: 100%;
	position: absolute;
	width: 56.25%;
	left: 50%;
	transform: translateX(-50%);

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
			: css``};
`;

const ActiveMediaBox = styled.div`
	display: flex;
	flex-direciton: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	position: relative;
	top: 50%;
	transform: translateY(-50%);
`;

const SizingHack = styled.div`
	height: 0;
	transition: all linear 0.3s;
	position: relative;
	width: 100%;
	transform: none;
	padding-bottom: 56.25%;
	position: absolute;

	/* For hiding SC Embeds in favor of Thumbnails*/
	${(props: $IsSoundCloud & $IsExpanded) =>
		props.isSoundCloud &&
		css`
			${Player} {
				display: none;
			}
		`};
`;

const PlayerHolder = styled.div`
	overflow: hidden;
	padding-bottom: 56.25%;
	height: 0;
	position: relative;

	${Player} {
		position: absolute;
	}
`;
