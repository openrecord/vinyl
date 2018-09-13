import gql from 'graphql-tag';
import {mod, toggle, updateAll, cons} from 'shades';
import {ifNull, makeMutation} from '../../common/utils';

export const toggleQueue = makeMutation(gql`
	query {
		queue @client {
			isOpen
		}
	}
`)(() => mod('queue', 'isOpen')(toggle));

export const enqueue = makeMutation(
	gql`
		{
			queue @client {
				queue
			}

			player @client {
				currentlyPlaying
			}
		}
	`
)(({track}) => updateAll(mod('queue', 'queue')(cons(track)), mod('player', 'currentlyPlaying')(ifNull(track))));
