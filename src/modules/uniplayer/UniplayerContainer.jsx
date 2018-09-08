import {connect} from 'react-redux';
import React from 'react';

import Uniplayer from './Uniplayer.jsx';

const mapStateToProps = ({player}) => player;

export default connect(mapStateToProps)(({currentlyPlaying}) => <Uniplayer currentlyPlaying={currentlyPlaying} />);
