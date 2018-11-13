import gql from 'graphql-tag';

import {mutation} from '../utils';

export default mutation(gql`
	mutation UpdatePlaying($track: Track!) {
		updatePlaying(track: $track) @client
	}
`);
