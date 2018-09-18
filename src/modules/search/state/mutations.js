import _ from 'lodash';
import {set, mod, toggle} from 'shades';
import gql from 'graphql-tag';
import {updateQL} from '../../common/utils';

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
`).with(() => mod('search', 'isSearchOpen')(toggle));
