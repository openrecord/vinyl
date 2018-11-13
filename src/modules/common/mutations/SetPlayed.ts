import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';

import {mutation} from '../utils';

const SET_PLAYED = gql`
	mutation SetPlayed($played: Float!) {
		setPlayed(played: $played) @client
	}
`;

export default mutation(SET_PLAYED);

export function useSetPlayed(): (played: number) => void {
	const setPlayed = useMutation(SET_PLAYED);
	return played => setPlayed({variables: {played}});
}
