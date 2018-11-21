import gql from 'graphql-tag';
import * as _ from 'lodash';
import { useQuery } from 'react-apollo-hooks';
import { has } from 'shades';

import { $Track } from '../../search/components/types';
import { useStore } from '../../store';
import TrackFragments from '../fragments/TrackFragments';
import usePlaylistName from '../hooks/usePlaylistName';
import { modulo } from '../utils';
import useUpdatePlaying from './UpdatePlaying';

interface $SkipOptions {
	local: boolean;
}
interface $SkipControls {
	playNext(options?: $SkipOptions): void;
	playPrev(options?: $SkipOptions): void;
}

export default function useSkipControls(): $SkipControls {
	const playlist = usePlaylistName();

	const {
		data: {
			playlist: {tracks}
		}
	} = useQuery<$QueryData>(QUERY, {variables: {playlist}});

	const {
		state: {
			player: {currentlyPlaying: {id} = {id: ''}}
		},
		actions: {
			player: {setter}
		}
	} = useStore();

	const updatePlaying = useUpdatePlaying();

	const makeSkipControl = (n: number) => ({local} = {local: false}) => {
		const nextSong = findNthNextTrack(tracks, id, n);
		if (nextSong) {
			setter('currentlyPlaying')(nextSong);
			if (!local) {
				updatePlaying(nextSong);
			}
		}
	};

	return {
		playNext: makeSkipControl(1),
		playPrev: makeSkipControl(-1)
	};
}

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
