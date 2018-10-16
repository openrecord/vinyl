import {mutation} from '../../common/utils';
import gql from 'graphql-tag';

export default mutation(gql`
	mutation SetSearch($query: String!) {
		updateQuery(query: $query) @client
	}
`);
