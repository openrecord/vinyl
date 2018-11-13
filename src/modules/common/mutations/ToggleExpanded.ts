import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';

import {mutation} from '../utils';

const TOGGLE_EXPANDED = gql`
	mutation toggleExpanded($maybeValue: Boolean) {
		toggleExpanded(maybeValue: $maybeValue) @client
	}
`;

export function useToggleExpanded(): (expanded?: boolean) => void {
	const toggleExpanded = useMutation(TOGGLE_EXPANDED);
	return expanded => toggleExpanded({variables: {maybeValue: expanded}});
}

export default mutation(TOGGLE_EXPANDED);
