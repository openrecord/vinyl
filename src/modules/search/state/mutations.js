import {set, mod} from 'shades';
import gql from 'graphql-tag';

import {updateQL, toggleOr} from '../../common/utils';

export const updateQuery = updateQL(gql`
	query {
		search @client {
			query
		}
	}
`).with(({query}) => set('search', 'query')(query));

export const toggleSearch = updateQL(gql`
	query {
		search @client {
			isSearchOpen
		}
	}
`).with(({isOpen}) => mod('search', 'isSearchOpen')(toggleOr(isOpen)));
