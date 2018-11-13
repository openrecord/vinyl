import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';

import {mutation} from '../utils';

const SET_DURATION = gql`
	mutation SetDuration($duration: Float!) {
		setDuration(duration: $duration) @client
	}
`;
export default mutation(SET_DURATION);

export function useSetDuration(): (duration: number) => void {
	const setDuration = useMutation(SET_DURATION);
	return duration => setDuration({variables: {duration}});
}
