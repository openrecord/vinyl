import deepmerge from 'deepmerge';
import gql from 'graphql-tag';
import * as _ from 'lodash';
import * as React from 'react';
import { Query } from 'react-apollo';
import { has } from 'shades';

import { $Track } from '../../search/components/types';
import adapt from '../components/Adapt';
import WithPlaylistId from '../components/WithPlaylistId';
import TrackFragments from '../fragments/TrackFragments';
import { modulo, nullToUndefined } from '../utils';
import LocalUpdatePlaying from './LocalUpdatePlaying';
import UpdatePlaying from './UpdatePlaying';

function findNthNextTrack(tracks: $Track[], id: string, n: number) {
	const idx = _.findIndex(tracks, has({id}));
	if (idx === -1) {
		return null;
	}
	return tracks[modulo(idx + n, tracks.length)];
}

const QUERY = gql`
	query PlayNextQuery($playlist: String) {
		playlist(where: {name: $playlist}) {
			id
			tracks {
				...AllTrack
			}
		}

		player @client {
			currentlyPlaying {
				id
			}
		}
	}
	${TrackFragments.all}
`;

interface $QueryData {
	playlist: {
		tracks: $Track[];
	};
	player: {
		currentlyPlaying: {
			id: string;
		};
	};
}

// TODO: remove for typed-adopt
interface $Renderer {
	render(args?: any): React.ReactNode;
}

const Composed = adapt(
	{
		playlist: <WithPlaylistId />
	},
	{
		data: ({render, playlist}: $Renderer & {playlist: string}) => (
			<Query query={QUERY} variables={{playlist}}>
				{({data}) =>
					render(
						deepmerge(
							{playlist: {tracks: []}, player: {currentlyPlaying: {id: ''}}},
							nullToUndefined(data)
						)
					)
				}
			</Query>
		),
		updatePlaying: <UpdatePlaying />,
		localUpdatePlaying: <LocalUpdatePlaying variable="track" />
	}
);

interface $RenderProps {
	data: $QueryData;
	updatePlaying: (track: $Track) => void;
	localUpdatePlaying: (track: $Track) => void;
}

interface $Props {
	children?(f: (arg: {local: boolean}) => void): React.ReactNode;
}

export default function PlayNthNextFromQueue(n: number) {
	return ({children}: $Props) => (
		<Composed>
			{({
				data: {
					playlist: {tracks},
					player: {currentlyPlaying: {id} = {id: ''}}
				},
				updatePlaying,
				localUpdatePlaying
			}: $RenderProps) =>
				children &&
				children(({local}) => {
					const nextSong = findNthNextTrack(tracks, id, n);
					if (nextSong) {
						localUpdatePlaying(nextSong);
						if (!local) {
							updatePlaying(nextSong);
						}
					}
				})
			}
		</Composed>
	);
}
