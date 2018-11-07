import gql from 'graphql-tag';

import {mutation} from '../utils';

export default mutation(gql`
	mutation togglePlayingLocal($nowPlaying: Boolean) {
		togglePlaying(nowPlaying: $nowPlaying) @client
	}
`);
