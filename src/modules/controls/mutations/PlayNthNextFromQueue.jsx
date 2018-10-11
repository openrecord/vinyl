import gql from 'graphql-tag';
import {mutation} from '../../common/utils';

export default mutation(gql`
	mutation playNthNextFromQueue($playlist: String!, $n: Integer!) {
		playNthNextFromQueue(playlist: $playlist, n: $n) @client
	}
`);
