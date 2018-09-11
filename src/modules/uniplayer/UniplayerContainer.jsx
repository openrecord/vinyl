import {connect} from 'react-redux';
import React from 'react';

import Uniplayer from './Uniplayer.jsx';

const mapStateToProps = ({player: {currentlyPlaying}, queue: {queue}}) => ({
	currentlyPlaying,
	queue
});

export default connect(mapStateToProps)(props => <Uniplayer {...props} />);
