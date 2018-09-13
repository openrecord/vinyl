import {connect} from 'react-redux';
import React from 'react';

import Uniplayer from './Uniplayer.jsx';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const PLAYER_QUERY = gql`
	query UniplayerContainer {
		player @client {
			currentlyPlaying
		}

		queue @client {
			queue
			isOpen
		}
	}
`;

export default () => (
	<Query query={PLAYER_QUERY}>
		{({
			data: {
				player: {currentlyPlaying},
				queue: {queue}
			}
		}) => <Uniplayer currentlyPlaying={currentlyPlaying} queue={queue} />}
	</Query>
);
