import React from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';

import {device} from '../../../../styles/utilities/device';
import {ifElse} from '../../../common/utils';
import PlayerBox from './PlayerBox';
import Slider from './Slider';
import SongControls from './SongControls';

export default function Uniplayer({
	playing,
	togglePlaying,
	playNext,
	playPrev,
	played,
	duration,
	currentlyPlaying,
	setDuration,
	setPlayed
}) {
	const title = currentlyPlaying && <Title>{currentlyPlaying.info.title}</Title>;

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
			currentlyPlaying={currentlyPlaying}
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
		<Footer className="uniplayer2">
			<Row>
				{title}
				{controls}
				{player}
			</Row>
		</Footer>
	);

	const mobile = (
		<Footer className="uniplayer2">
			{currentlyPlaying && (
				<Row top>
					{title}
					{player}
				</Row>
			)}
			<Row>{controls}</Row>
		</Footer>
	);

	return <MediaQuery query={device.small}>{ifElse(mobile, desktop)}</MediaQuery>;
}

const Footer = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	background: rgb(36, 36, 36);
`;

const Row = styled.div`
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: ${props => props.top && '0.0625rem solid rgb(64, 64, 64)'};

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
	}
`;
