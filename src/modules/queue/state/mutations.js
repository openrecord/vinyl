import _ from 'lodash';

import {set, has, mod, updateAll} from 'shades';
import gql from 'graphql-tag';

import {updateQL, mod as modulo} from '../../common/utils';
import TrackFragments from '../../common/fragments/TrackFragments';

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
).with(({n}) => state => {
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

	const track = findNthNextTrack(tracks, has({id}), n);

	// prettier-ignore
	return mod('player')(
		updateAll(
			set('played')(0), 
			set('duration')(0), 
			set('currentlyPlaying')(track))
	)(state);
});

function findNthNextTrack(tracks, pred, n) {
	const idx = _.findIndex(tracks, pred);
	if (idx === -1) {
		return null;
	}
	return tracks[modulo(idx + n, tracks.length)];
}
