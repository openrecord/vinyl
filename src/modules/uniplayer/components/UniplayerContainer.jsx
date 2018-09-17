import React from 'react';

import Uniplayer from './Uniplayer.jsx';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Youtube} from '../../search/components/YoutubeQueryContainer';

const PLAYER_QUERY = gql`
	query UniplayerContainer {
		player @client {
			currentlyPlaying {
				...YoutubeEntry
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
	${Youtube.fragments.result}
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
