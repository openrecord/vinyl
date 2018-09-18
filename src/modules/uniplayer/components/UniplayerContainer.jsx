import React from 'react';

import Uniplayer from './Uniplayer.jsx';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
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

const PLAY_NEXT_FROM_QUEUE = gql`
	mutation playNextFromQueue {
		playNextFromQueue @client
	}
`;

export default () => (
	<Mutation mutation={PLAY_NEXT_FROM_QUEUE}>
		{playNextFromQueue => (
			<Query query={PLAYER_QUERY}>
				{({
					data: {
						player: {currentlyPlaying},
						queue: {tracks}
					}
				}) => <Uniplayer currentlyPlaying={currentlyPlaying} tracks={tracks} playNextFromQueue={() => playNextFromQueue()} />}
			</Query>
		)}
	</Mutation>
);
