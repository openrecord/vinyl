import gql from 'graphql-tag';
import {set} from 'shades';

import TrackFragments from '../../common/fragments/TrackFragments';
import {updateQL} from '../../common/utils';

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
