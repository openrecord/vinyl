import React from 'react';
import ReactPlayer from 'react-player';
import styled, {css} from 'styled-components';
import {has, find} from 'shades';
import Timeout from './Timeout';
import Duration from './Duration';

class Uniplayer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			//Player State
			playing: true,
			volume: 1,
			played: 0,
			loaded: 0,
			duration: 0,
			seeking: false,
			hoverTime: '',
			hoverRange: '',
			mousePosition: '',
			expanded: false
		};
	}

	componentDidUpdate() {
		const iframes = document.getElementsByTagName('iframe');
		const sc = find(has({src: src => src.includes('soundcloud')}))(iframes);
		if (sc) {
			sc.allow = 'autoplay';
		}
	}

	//React Player Functions
	onPlay = () => {
		this.setState({playing: true});
	};
	onPause = () => {
		this.setState({playing: false});
	};

	onProgress = state => {
		// We only want to update time slider if we are not currently seeking
		if (!this.state.seeking) {
			this.setState(state);
		}
	};
	onDuration = duration => {
		this.setState({duration});
	};

	//Click functions for scrubbing through the player
	onSeekMouseDown = e => {
		this.setState({seeking: true});
	};
	onSeekChange = e => {
		this.setState({played: parseFloat(e.target.value)});
	};
	onSeekMouseUp = e => {
		this.setState({seeking: false});
		this.YTPlayer.seekTo(parseFloat(e.target.value));
	};

	//Hover functions for showing current time
	onMouseMove = e => {
		var barWidth = this.refs.playerBar.offsetWidth,
			songDuration = this.state.duration,
			mousePosition = e.nativeEvent.offsetX,
			scrubTime = (songDuration / barWidth) * mousePosition,
			rangeTime = mousePosition / barWidth,
			minutes = Math.floor(scrubTime / 60),
			seconds = Math.round(scrubTime - minutes * 60);
		if (seconds <= 9) {
			seconds = '0' + seconds;
		}
		var hoverTime = '' + minutes + ':' + seconds + '';
		this.setState({hoverTime: hoverTime});
		this.setState({mousePosition: mousePosition});
		this.setState({hoverRange: rangeTime});
	};

	//OpenRecord Player Addon Functions
	playToggle = () => {
		this.setState({playing: !this.state.playing});
	};

	//OpenRecord Player Addon Functions
	expandToggle = () => {
		this.setState({expanded: !this.state.expanded});
	};

	setYTPlayer = player => {
		this.YTPlayer = player;
	};

	renderYT(currentlyPlaying) {
		return (
			<div className="player-inner">
				<ReactPlayer
					ref={this.setYTPlayer}
					className="react-player"
					width="100%"
					height="100%"
					url={getTrackUrl(currentlyPlaying)}
					playing={this.state.playing}
					loop
					config={{
						soundcloud: {
							options: {
								auto_play: true
							},
							preload: true
						}
					}}
					onPlay={this.onPlay}
					onPause={this.onPause}
					onEnded={this.props.playNext}
					onProgress={this.onProgress}
					onDuration={this.onDuration}
				/>
			</div>
		);
	}

	render() {
		const {currentlyPlaying} = this.props;

		var player = {},
			playback = this.state.played * 100;

		if (this.state.expanded) {
			player.expanded = ' expanded';
		} else {
			player.expanded = '';
		}

		return (
			<div className="uniplayer">
				<div className="uniplayer-left">
					{currentlyPlaying && (
						<div className="info-box">
							<div className="image-holder">
								<img src={currentlyPlaying.info.thumbnail} />
							</div>
							<h5 className="song-title">{currentlyPlaying.info.title}</h5>
						</div>
					)}
				</div>
				<div className="uniplayer-middle">
					<div className="player-controls">
						<div className="player-buttons">
							<div className="arrow previous" onClick={this.props.playPrev} />
							<PlayPause play={this.state.playing} onClick={this.playToggle} />
							<div className="arrow next" onClick={this.props.playNext} />
						</div>
						<div className="playback-holder">
							<Duration className="duration" seconds={this.state.duration * this.state.played} />
							<div className="player-slider">
								<div className="progress-bar-bg">
									<span
										className="progress-bar"
										style={{right: 'calc(100% - ' + playback + '%)'}}
									/>
								</div>
								<input
									className="player-bar"
									ref="playerBar"
									type="range"
									min={0}
									max={1}
									step="any"
									value={this.state.played}
									onMouseEnter={this.onMouseEnter}
									onMouseMove={this.onMouseMove}
									onMouseLeave={this.onMouseLeave}
									onMouseDown={this.onSeekMouseDown}
									onChange={this.onSeekChange}
									onMouseUp={this.onSeekMouseUp}
								/>
							</div>
							<Duration className="duration" seconds={this.state.duration} />
						</div>
					</div>
				</div>
				<div className="uniplayer-right" />
				{currentlyPlaying && (
					<div className={'player-holder' + player.expanded}>
						<div className="player-outer">
							<div className="iframeblocker" onClick={this.playToggle} />
							<div className="size-buttons">
								<div className="expand-button" onClick={this.expandToggle} />
								<div className="minimize-button" />
							</div>
							{currentlyPlaying && this.renderYT(currentlyPlaying)}
						</div>
					</div>
				)}

				{this.state.expanded && <div className="player-background" />}
			</div>
		);
	}
}

const PlayPause = styled.div`
	border: 1px solid white;
	border-radius: 50%;
	cursor: pointer;
	display: inline-block;
	position: relative;
	height: 1rem;
	padding: 0.5rem;
	opacity: 0.8;
	width: 1rem;
	vertical-align: top;

	&:hover {
		opacity: 1;
	}

	${props =>
		props.play
			? css`
					&:before {
						background: white;
						content: '';
						display: inline-block;
						height: 0.875rem;
						margin-left: 0.0625rem;
						margin-right: 0.125rem;
						width: 0.25rem;
					}
					&:after {
						background: white;
						content: '';
						display: inline-block;
						height: 0.875rem;
						margin-left: 0.125rem;
						margin-right: 0.0625rem;
						width: 0.25rem;
					}
			  `
			: css`
					&:before {
						content: '';
						border-bottom: 0.425rem solid transparent;
						border-left: 0.725rem solid white;
						border-top: 0.425rem solid transparent;
						display: inline-block;
						height: 0;
						width: 0;
						transform: translateX(0.1rem);
					}
			  `};
`;

function getTrackUrl(track) {
	if (track.info.url.startsWith('http')) {
		return track.info.url;
	}

	if (track.info.source === 'YOUTUBE') {
		return 'https://www.youtube.com/watch?v=' + track.info.url;
	}
}

export default Timeout(Uniplayer);
