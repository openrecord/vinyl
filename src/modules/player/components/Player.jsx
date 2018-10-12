import React from 'react';
import ReactPlayer from 'react-player';

import {has, find} from 'shades';

export default class Player extends React.Component {
	constructor(props) {
		super(props);
		this.playerRef = React.createRef();
	}

	componentDidUpdate(oldProps) {
		const secondsElapsed = (this.props.played - oldProps.played) * this.props.duration;
		if (secondsElapsed > 2.5 || secondsElapsed < 0) {
			this.playerRef.current.seekTo(this.props.played);
		}

		const iframes = document.getElementsByTagName('iframe');
		const sc = find(has({src: src => src.includes('soundcloud')}))(iframes);
		if (sc) {
			sc.allow = 'autoplay';
		}
	}

	render() {
		const {currentlyPlaying, playing, togglePlaying, playNext, setDuration, setPlayed} = this.props;

		if (!currentlyPlaying) {
			return null;
		}

		return (
			<ReactPlayer
				data-style-id="react-player"
				key="react-player"
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
					},
					youtube: {
						preload: true
					}
				}}
				onPlay={() => togglePlaying(true)}
				onPause={() => togglePlaying(false)}
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