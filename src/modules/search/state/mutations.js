import _ from 'lodash';
import {set} from 'shades';
import gql from 'graphql-tag';
import {updateQL} from '../../common/utils';

export const updateQuery = updateQL(gql`
	query {
		search @client {
			query
		}
	}
`).with(({query}) => set('search', 'query')(query));
