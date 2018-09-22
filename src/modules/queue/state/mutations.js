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

export const playNextFromQueue = updateQL(
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
).with(() => state => {
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

	const track = findNextTrack(tracks, has({id}));
	return set('player', 'currentlyPlaying')(track)(state);
});

function findNextTrack(tracks, pred) {
	const idx = _.findIndex(tracks, pred);
	const nextIdx = idx + 1;
	if (!nextIdx) {
		return null;
	}
	if (nextIdx === tracks.length) {
		return tracks[0];
	}

	return tracks[nextIdx];
}
