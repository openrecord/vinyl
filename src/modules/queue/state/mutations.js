import gql from 'graphql-tag';
import {mod, toggle, updateAll, cons} from 'shades';
import {ifNull, updateQL} from '../../common/utils';
import {Youtube} from '../../search/components/YoutubeQueryContainer';

export const enqueue = updateQL(gql`
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
`).with(({track}) => updateAll(mod('queue', 'tracks')(cons(track)), mod('player', 'currentlyPlaying')(ifNull(track))));
