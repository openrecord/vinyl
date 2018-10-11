import MediaQuery from 'react-responsive';
import React from 'react';
import styled, {css} from 'styled-components';

import {device} from '../../../../styles/utilities/device';
import {ifElse} from '../../../common/utils';
import PlayerBox from './PlayerBox';
import Slider from './Slider';
import SongControls from './SongControls';

export default function Uniplayer({
	playing,
	expanded,
	togglePlaying,
	toggleExpanded,
	playNext,
	playPrev,
	played,
	duration,
	currentlyPlaying,
	setDuration,
	setPlayed
}) {
	const title = currentlyPlaying && (
		<Title centered={expanded}>{currentlyPlaying.info.title}</Title>
	);

	const controls = (
		<MediaControls>
			<SongControls
				playing={playing}
				togglePlaying={togglePlaying}
				playNext={playNext}
				playPrev={playPrev}
			/>
			<Slider played={played} duration={duration} setPlayed={setPlayed} />
		</MediaControls>
	);

	const player = currentlyPlaying && (
		<PlayerBox
			expanded={expanded}
			currentlyPlaying={currentlyPlaying}
			toggleExpanded={toggleExpanded}
			onPlay={() => togglePlaying(true)}
			onPause={() => togglePlaying(false)}
			playNext={playNext}
			playing={playing}
			played={played}
			duration={duration}
			setDuration={setDuration}
			setPlayed={setPlayed}
		/>
	);
	const desktop = (
		<Footer>
			<Row>
				{title}
				{controls}
				{player}
			</Row>
		</Footer>
	);

	const mobile = (
		<Footer>
			{currentlyPlaying && (
				<Row top transparent={expanded}>
					{title}
					{player}
				</Row>
			)}
			<Row>{controls}</Row>
		</Footer>
	);

	return <MediaQuery query={device.small}>{ifElse(mobile, desktop)}</MediaQuery>;
}

const Footer = styled.div.attrs({className: 'uniplayer2'})`
	position: fixed;
	bottom: 0;
	width: 100%;
`;

const Row = styled.div`
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: ${props => props.top && !props.transparent && '0.0625rem solid rgb(64, 64, 64)'};
	background: ${props => !props.transparent && 'rgb(36, 36, 36)'};

	@media ${device.small} {
		height: 4.5rem;
	}
`;

const MediaControls = styled.div`
	min-width: 40%;

	@media ${device.small} {
		width: 100%;
	}
`;

const Title = styled.h5`
	position: absolute;
	left: 1.5rem;
	top: 50%;
	transform: translateY(-50%);
	color: rgb(233, 233, 233);
	max-width: 25%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	@media ${device.small} {
		position: static;
		transform: none;
		margin-right: auto;
		margin-left: 0.75rem;
		max-width: 60%;
		font-size: 0.845rem;

		${props =>
			props.centered &&
			css`
				margin: auto;
				font-size: 1rem;
			`};
	}
`;
