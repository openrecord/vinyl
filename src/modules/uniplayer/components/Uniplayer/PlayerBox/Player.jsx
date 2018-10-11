import React from 'react';
import ReactPlayer from 'react-player';

export default class Player extends React.Component {
	constructor(props) {
		super(props);
		this.playerRef = React.createRef();
	}

	componentDidUpdate(oldProps) {
		const secondsElapsed = (this.props.played - oldProps.played) * this.props.duration;
		if (secondsElapsed > 1.5 || secondsElapsed < 0) {
			this.playerRef.current.seekTo(this.props.played);
		}
	}

	render() {
		const {
			currentlyPlaying,
			playing,
			onPlay,
			onPause,
			playNext,
			setDuration,
			setPlayed
		} = this.props;

		return (
			<ReactPlayer
				width="100%"
				height="100%"
				ref={this.playerRef}
				url={getTrackUrl(currentlyPlaying)}
				playing={playing}
				loop
				config={{
					soundcloud: {
						options: {
							auto_play: true
						},
						preload: true
					}
				}}
				onPlay={onPlay}
				onPause={onPause}
				onEnded={playNext}
				onDuration={setDuration}
				onProgress={({played}) => setPlayed(played)}
			/>
		);
	}
}

function getTrackUrl(track) {
	if (track.info.url.startsWith('http')) {
		return track.info.url;
	}

	if (track.info.source === 'YOUTUBE') {
		return 'https://www.youtube.com/watch?v=' + track.info.url;
	}
}
