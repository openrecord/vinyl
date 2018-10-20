import gql from 'graphql-tag';

import {mutation} from '../../common/utils';

export default mutation(gql`
	mutation SetSearch($query: String!) {
		updateQuery(query: $query) @client
	}
`);
