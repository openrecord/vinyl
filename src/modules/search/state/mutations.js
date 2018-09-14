import _ from 'lodash';
import {set} from 'shades';
import gql from 'graphql-tag';
import {makeMutation} from '../../common/utils';

export const updateQuery = makeMutation(gql`
	query {
		search @client {
			query
		}
	}
`)(({query}) => set('search', 'query')(query));
