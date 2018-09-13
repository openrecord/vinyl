import React from 'react';
import ReactPlayer from 'react-player';

import Queue from '../queue/components/QueueContainer';
import Timeout from './Timeout';

class Uniplayer extends React.Component {
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
			mousePosition: '',
			playerActive: true
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
		this.setState({
			playing: false,
			playerActive: true
		});
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
	onMouseMove = e => {
		var barWidth = this.refs.playerBar.offsetWidth,
			songDuration = this.state.duration,
			mousePosition = e.nativeEvent.offsetX,
			scrubTime = songDuration / barWidth * mousePosition,
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

	playerActive = () => {
		this.setState({playerActive: true});
		this.props.clearTimeouts();
		if (this.state.playing) {
			this.props.setTimeout(() => {
				this.setState({playerActive: false});
			}, 2500);
		}
	};

	//OpenRecord Player Addon Functions
	playToggle = () => {
		if (this.state.playing) {
			this.setState({playing: false});
		} else {
			this.setState({playing: true});
			this.props.setTimeout(() => {
				this.setState({playerActive: false});
			}, 2500);
		}
	};

	setYTPlayer = player => {
		this.YTPlayer = player;
	};

	renderYT(currentlyPlaying) {
		var player = {};
		player.id = 'https://www.youtube.com/watch?v=' + currentlyPlaying.id;
		return (
			<div className="player-inner">
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
		const {currentlyPlaying, queue} = this.props;

		var player = {},
			playback = this.state.played * 100;
		if (this.state.playing) {
			player.status = ' playing';
		} else {
			player.status = ' paused';
		}
		if (this.state.playerActive) {
			player.active = ' active';
		} else {
			player.active = '';
		}

		if (queue.length > 0) {
			return (
				<div className="uniplayer-outer">
					<div className={'uniplayer' + player.active} onMouseMove={this.playerActive}>
						<div className="player-holder">
							<div className="player-outer">
								<div className="playback-box">
									<div className="player-bar-bg" />
									<div className="progress-bar" style={{right: 'calc(100% - ' + playback + '%)'}} />
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
								<div className="time-holder" style={{left: ' ' + this.state.mousePosition + 'px'}}>
									<span className="hover-time">{this.state.hoverTime}</span>
								</div>
								<div className="iframeblocker" onMouseMove={this.playerActive} onClick={this.playToggle} />
								{currentlyPlaying && this.renderYT(currentlyPlaying)}
							</div>
							{currentlyPlaying && (
								<div className="info-box">
									<h3 className="song-title">{currentlyPlaying.content.title}</h3>
								</div>
							)}
						</div>
					</div>
					<Queue />
				</div>
			);
		} else {
			return (
				<div className="uniplayer-outer">
					<div className="uniplayer" />
					<Queue />
				</div>
			);
		}
	}
}

export default Timeout(Uniplayer);
