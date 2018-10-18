import {mod, set} from 'shades';
import gql from 'graphql-tag';

import {updateQL, toggleOr} from '../../common/utils';

export const toggleExpanded = updateQL(gql`
	query {
		player @client {
			expanded
		}
	}
`).with(({maybeValue}) => mod('player', 'expanded')(toggleOr(maybeValue)));

export const togglePlaying = updateQL(gql`
	query {
		player @client {
			playing
		}
	}
`).with(({maybeValue}) => mod('player', 'playing')(toggleOr(maybeValue)));

export const setPlayed = updateQL(gql`
	query {
		player @client {
			played
		}
	}
`).with(({played}) => set('player', 'played')(played));

export const setDuration = updateQL(gql`
	query {
		player @client {
			duration
		}
	}
`).with(({duration}) => set('player', 'duration')(duration));
