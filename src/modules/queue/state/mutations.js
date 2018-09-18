import _ from 'lodash';
import gql from 'graphql-tag';
import {mod, updateAll, cons, set, findBy, get, has} from 'shades';
import {ifNull, updateQL} from '../../common/utils';
import {Youtube} from '../../search/components/YoutubeQueryContainer';

export const enqueue = updateQL(
	gql`
		{
			queue @client {
				tracks {
					...YoutubeEntry
				}
			}

			player @client {
				currentlyPlaying {
					...YoutubeEntry
				}
			}
		}
		${Youtube.fragments.result}
	`
).with(({track}) =>
	updateAll(mod('queue', 'tracks')(cons(track)), mod('player', 'currentlyPlaying')(ifNull(track)))
);

export const updatePlaying = updateQL(
	gql`
		query {
			queue {
				tracks {
					...YoutubeEntry
				}
			}
			player {
				currentlyPlaying {
					...YoutubeEntry
				}
			}
		}

		${Youtube.fragments.result}
	`
).with(({track}) => set('player', 'currentlyPlaying')(track));

export const playNextFromQueue = updateQL(
	gql`
		query {
			queue @client {
				tracks {
					...YoutubeEntry
				}
			}

			player {
				currentlyPlaying {
					...YoutubeEntry
				}
			}
		}
		${Youtube.fragments.result}
	`
).with(() => state => {
	//prettier-ignore
	const {
	  queue: {
		  tracks
		}, 
		player: {
			currentlyPlaying: {
				id: {
					videoId
				}
			}
		}
	} = state;

	const track = findNextTrack(tracks, has({id: {videoId}}));
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
