import {connect} from 'react-redux';
import React from 'react';

import Uniplayer from './Uniplayer.jsx';
import * as queueActions from '../queue/state';

const mapStateToProps = ({player}) => player;

export default connect(mapStateToProps)(({currentlyPlaying, results}) => (
	<Uniplayer currentlyPlaying={currentlyPlaying} results={results} />
));
