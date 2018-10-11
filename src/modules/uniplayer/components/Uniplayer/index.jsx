import React from 'react';
import styled from 'styled-components';

import {has, find} from 'shades';

import {device} from '../../../../styles/utilities/device';
import PlayerBox from './PlayerBox';
import Slider from './Slider';
import SongControls from './SongControls';

class Uniplayer extends React.Component {
	componentDidUpdate() {
		const iframes = document.getElementsByTagName('iframe');
		const sc = find(has({src: src => src.includes('soundcloud')}))(iframes);
		if (sc) {
			sc.allow = 'autoplay';
		}
	}

	render() {
		const {
			playing,
			togglePlaying,
			playNext,
			playPrev,
			played,
			duration,
			currentlyPlaying,
			setDuration,
			setPlayed
		} = this.props;

		return (
			<Footer className="uniplayer2">
				{currentlyPlaying && <Title>{currentlyPlaying.info.title}</Title>}
				<MediaControls>
					<SongControls
						playing={playing}
						togglePlaying={togglePlaying}
						playNext={playNext}
						playPrev={playPrev}
					/>
					<Slider played={played} duration={duration} setPlayed={setPlayed} />
				</MediaControls>
				{currentlyPlaying && (
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
				)}
			</Footer>
		);
	}
}

const Footer = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 5rem;
	background: rgb(36, 36, 36);
	display: flex;
	justify-content: center;
	align-items: center;

	@media ${device.small} {
		flex-direction: column;
		height: 4.5rem;
		border-top: 0.0625rem solid rgba(64, 64, 64, 1);
	}
`;

const MediaControls = styled.div`
	min-width: 35%;
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

	:after {
		content: '';
		background-image: linear-gradient(to right, transparent, rgb(36, 36, 36));
		height: 100%;
		position: absolute;
		right: 0;
		width: 0.75rem;
	}
`;

export default Uniplayer;
