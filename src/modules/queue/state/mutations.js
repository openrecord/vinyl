import _ from 'lodash';
import gql from 'graphql-tag';
import {mod, updateAll, cons, set, findBy, get, has} from 'shades';
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
`).with(({track}) =>
	updateAll(mod('queue', 'tracks')(cons(track)), mod('player', 'currentlyPlaying')(ifNull(track)))
);
