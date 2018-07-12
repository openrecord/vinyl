import './uniplayer.scss';

import React from 'react';
import ReactPlayer from 'react-player';
import Duration from './Duration.jsx';

export default class Uniplayer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			//Player State
			playing: false,
			volume: 1,
			muted: false,
			played: 0,
			loaded: 0,
			duration: 0,
			playbackRate: 1.0,
			loop: false,
			seeking: false,
			hoverTime: '',
			hoverRange: '',
			mousePosition: ''
		};
	}

	//React Player Functions
	stop = () => {
		this.setState({url: null, playing: false});
	};
	toggleLoop = () => {
		this.setState({loop: !this.state.loop});
	};
	setVolume = e => {
		this.setState({volume: parseFloat(e.target.value)});
	};
	toggleMuted = () => {
		this.setState({muted: !this.state.muted});
	};
	setPlaybackRate = e => {
		this.setState({playbackRate: parseFloat(e.target.value)});
	};
	onPlay = () => {
		this.setState({playing: true});
	};
	onPause = () => {
		this.setState({playing: false});
	};
	onEnded = () => {
		console.log('Song ended');
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
	onMouseEnter = e => {
		this.setState({hovering: true});
	};
	onMouseLeave = e => {
		this.setState({hovering: false});
	};
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
		if (this.state.playing) {
			this.setState({playing: false});
		} else {
			this.setState({playing: true});
		}
	};

	setYTPlayer = player => {
		this.YTPlayer = player;
	};

	renderYT() {
		var player = {};
		player.id = 'https://www.youtube.com/watch?v=' + '2H5R0bdblEE';
		return (
			<div className="player-holder">
				<ReactPlayer
					ref={this.setYTPlayer}
					className="react-player"
					width="100%"
					height="100%"
					url={player.id}
					playing={this.state.playing}
					loop={this.state.loop}
					playbackRate={this.state.playbackRate}
					volume={this.state.volume}
					muted={this.state.muted}
					onReady={() => console.log('onReady')}
					onStart={() => console.log('onStart')}
					onPlay={this.onPlay}
					onPause={this.onPause}
					onBuffer={() => console.log('onBuffer')}
					onSeek={e => console.log('onSeek', e)}
					onEnded={this.onEnded}
					onError={e => console.log('onError', e)}
					onProgress={this.onProgress}
					onDuration={this.onDuration}
				/>
			</div>
		);
	}

	render() {
		var player = {};
		if (this.state.playing) {
			player.status = ' playing';
		} else {
			player.status = ' paused';
		}
		if (this.state.hovering) {
			player.hover = ' hovering';
		} else {
			player.hover = '';
		}
		return (
			<div className="uniplayer-container">
				<div className="uniplayer-holder">
					<div className="uniplayer">
						<div className="user-box">
							<div className="user-image-holder">
								<div className="user-image" />
							</div>
							<div className="user-id">
								<h5>Added by</h5>
								<h5>Superluckyland</h5>
							</div>
						</div>
						<div className="controls-box">
							<div className="arrow previous" />
							<div className={'play-pause' + player.status} onClick={this.playToggle} />
							<div className="arrow next" />
						</div>
						<div className="playback-box">
							<div className={'hover-range' + player.hover} style={{left: ' ' + this.state.mousePosition + 'px'}} />
							<input
								className={'player-bar' + player.hover}
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
							<h4 className="song-title">Diplo - Stay Open (feat. MØ) [Official Lyric Video]</h4>
							<div className="time-box">
								<Duration seconds={this.state.duration * this.state.played} className={'time-played' + player.hover} />
								<span className={'hover-time' + player.hover}>{this.state.hoverTime}</span>
								<h4 className="time-divider">-</h4>
								<Duration seconds={this.state.duration} />
							</div>
						</div>
					</div>
				</div>
				{this.renderYT()}
			</div>
		);
	}
}
