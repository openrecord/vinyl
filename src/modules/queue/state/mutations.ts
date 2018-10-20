import gql from 'graphql-tag';
import * as _ from 'lodash';
import {has, mod, set, updateAll} from 'shades';

import TrackFragments from '../../common/fragments/TrackFragments';
import {mod as modulo, updateQL} from '../../common/utils';
import {$Track} from '../../search/components/types';

export const updatePlaying = updateQL(
	gql`
		query {
			player @client {
				currentlyPlaying {
					...AllTrack
				}
			}
		}
		${TrackFragments.all}
	`
).with(({track}) => set('player', 'currentlyPlaying')(track));

interface $PlayNextFromQueueVariables {
	n: number;
}
interface $PlayNextFromQueueState {
	playlist: {
		tracks: $Track[];
	};
	player: {
		currentlyPlaying: {
			id: string;
		};
	};
}

export const playNthNextFromQueue = updateQL(
	gql`
		query PlayNextQuery($playlist: String!) {
			playlist(where: {name: $playlist}) {
				id
				tracks {
					id
				}
			}

			player @client {
				currentlyPlaying {
					id
				}
				duration
				played
			}
		}
	`
).with(({n}: $PlayNextFromQueueVariables) => (state: $PlayNextFromQueueState) => {
	//prettier-ignore
	const {
		playlist: {
			tracks
		}, 
		player: {
			currentlyPlaying: {
				id
			}
		}
	} = state;

	const track = findNthNextTrack(tracks, id, n);

	// prettier-ignore
	return mod('player')(
		updateAll(
			set('played')(0), 
			set('duration')(0), 
			set('currentlyPlaying')(track))
	)(state);
});

function findNthNextTrack(tracks: $Track[], id: string, n: number) {
	const idx = _.findIndex(tracks, has({id}));
	if (idx === -1) {
		return null;
	}
	return tracks[modulo(idx + n, tracks.length)];
}
