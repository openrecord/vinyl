import React from 'react';

import {Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';

import TrackFragments from '../../common/fragments/TrackFragments';
import Uniplayer from './Uniplayer/index';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import adapt from '../../common/components/Adapt';

const query = gql`
	query UniplayerContainer {
		player @client {
			currentlyPlaying {
				...AllTrack
			}
			playing
			expanded
			played
			duration
		}
	}
	${TrackFragments.all}
`;

const PLAY_NTH_NEXT_FROM_QUEUE = gql`
	mutation playNthNextFromQueue($playlist: String!, $n: Integer!) {
		playNthNextFromQueue(playlist: $playlist, n: $n) @client
	}
`;

const TOGGLE_PLAYING = gql`
	mutation togglePlaying($maybeValue: Boolean) {
		togglePlaying(maybeValue: $maybeValue) @client
	}
`;
const TOGGLE_EXPANDED = gql`
	mutation toggleExpanded($maybeValue: Boolean) {
		toggleExpanded(maybeValue: $maybeValue) @client
	}
`;

const SET_PLAYED = gql`
	mutation SetPlayed($played: Float!) {
		setPlayed(played: $played) @client
	}
`;

const SET_DURATION = gql`
	mutation SetDuration($duration: Float!) {
		setDuration(duration: $duration) @client
	}
`;

const Composed = adapt({
	playNthNextFromQueue: <Mutation mutation={PLAY_NTH_NEXT_FROM_QUEUE} />,
	togglePlaying: <Mutation mutation={TOGGLE_PLAYING} />,
	toggleExpanded: <Mutation mutation={TOGGLE_EXPANDED} />,
	setPlayed: <Mutation mutation={SET_PLAYED} />,
	setDuration: <Mutation mutation={SET_DURATION} />,
	data: ({render}) => <Query query={query}>{({data}) => render(data)}</Query>,
	playlist: <WithPlaylistId />
});

export default function UniplayerContainer() {
	return (
		<Composed>
			{({
				data: {
					player: {currentlyPlaying, playing, expanded, played, duration}
				},
				playNthNextFromQueue,
				toggleExpanded,
				togglePlaying,
				setPlayed,
				setDuration,
				playlist
			}) => (
				<Uniplayer
					currentlyPlaying={currentlyPlaying}
					playing={playing}
					played={played}
					duration={duration}
					togglePlaying={maybeValue =>
						togglePlaying({
							variables: {maybeValue: typeof maybeValue === 'boolean' ? maybeValue : undefined}
						})
					}
					expanded={expanded}
					toggleExpanded={maybeValue =>
						toggleExpanded({
							variables: {maybeValue: typeof maybeValue === 'boolean' ? maybeValue : undefined}
						})
					}
					playNext={_ => playNthNextFromQueue({variables: {playlist, n: 1}})}
					playPrev={_ => playNthNextFromQueue({variables: {playlist, n: -1}})}
					setPlayed={played => setPlayed({variables: {played}})}
					setDuration={duration => setDuration({variables: {duration}})}
				/>
			)}
		</Composed>
	);
}
