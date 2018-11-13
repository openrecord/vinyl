import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';

import {mutation} from '../utils';

const TOGGLE_PLAYING_LOCAL = gql`
	mutation togglePlayingLocal($nowPlaying: Boolean) {
		togglePlaying(nowPlaying: $nowPlaying) @client
	}
`;

export default mutation(TOGGLE_PLAYING_LOCAL);

export function useTogglePlayingLocal(): (playing?: boolean) => void {
	const togglePlaying = useMutation(TOGGLE_PLAYING_LOCAL);
	return playing => togglePlaying({variables: {playing}});
}
