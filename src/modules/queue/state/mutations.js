import gql from 'graphql-tag';
import {mod, set, toggle, updateAll, cons} from 'shades';
import {makeMutation, inspect, ifNull} from '../../common/utils';
import {Youtube} from '../../uniplayer/Search/YoutubeQueryContainer';

export const toggleQueue = makeMutation(gql`
	query {
		queue @client {
			isOpen
		}
	}
`)(() => mod('queue', 'isOpen')(toggle));

export const enqueue = (_, {track}, {cache}) => {
	const query = gql`
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
	`;

	const prev = cache.readQuery({query});
	const next = updateAll(mod('queue', 'tracks')(cons(track)), mod('player', 'currentlyPlaying')(ifNull(track)))(prev);
	cache.writeQuery({query, data: next});
	return null;
};
