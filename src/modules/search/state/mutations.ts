import gql from 'graphql-tag';
import {mod, set} from 'shades';

import {$Undef, toggleOr, updateQL} from '../../common/utils';

export const updateQuery = updateQL(gql`
	query {
		search @client {
			query
		}
	}
`).with(({query}: {query: string}) => set('search', 'query')(query));

export const toggleSearch = updateQL(gql`
	query {
		search @client {
			isSearchOpen
		}
	}
`).with(({isOpen}: {isOpen: $Undef<boolean>}) => mod('search', 'isSearchOpen')(toggleOr(isOpen)));
