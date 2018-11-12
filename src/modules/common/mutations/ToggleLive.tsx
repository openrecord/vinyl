import gql from 'graphql-tag';

import {mutation} from '../utils';

export default mutation(gql`
	mutation toggleLive($live: Boolean) {
		toggleLive(live: $live) @client
	}
`);
