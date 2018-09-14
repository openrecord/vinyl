import React from 'react';

import Uniplayer from './Uniplayer.jsx';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const PLAYER_QUERY = gql`
	query UniplayerContainer {
		player @client {
			currentlyPlaying {
				id {
					videoId
				}
				snippet {
					title
				}
			}
		}

		queue @client {
			tracks {
				id {
					videoId
				}
			}
		}
	}
`;

export default () => (
	<Query query={PLAYER_QUERY}>
		{({
			data: {
				player: {currentlyPlaying},
				queue: {tracks}
			}
		}) => <Uniplayer currentlyPlaying={currentlyPlaying} tracks={tracks} />}
	</Query>
);
