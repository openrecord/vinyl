import _ from 'lodash';
import gql from 'graphql-tag';
import {set, has} from 'shades';
import {updateQL} from '../../common/utils';
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
	return set('player', 'currentlyPlaying')(track)(state);
});

function findNthNextTrack(tracks, pred, n) {
	const idx = _.findIndex(tracks, pred);
	if (idx === -1) {
		return null;
	}
	return tracks[mod(idx + n, tracks.length)];
}

const mod = (n, m) => ((n % m) + m) % m;
