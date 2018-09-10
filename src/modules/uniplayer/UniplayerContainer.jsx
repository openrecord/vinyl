import {connect} from 'react-redux';
import React from 'react';

import Uniplayer from './Uniplayer.jsx';

const mapStateToProps = state => ({
	player: state.player,
	currentlyPlaying: state.player.currentlyPlaying,
	queue: state.queue
});

export default connect(mapStateToProps)(({player, queue}) => <Uniplayer currentlyPlaying={player.currentlyPlaying} queue={queue} />);
