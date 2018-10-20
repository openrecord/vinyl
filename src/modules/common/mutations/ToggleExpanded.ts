import gql from 'graphql-tag';
import {mutation} from '../utils';

export default mutation(gql`
	mutation toggleExpanded($maybeValue: Boolean) {
		toggleExpanded(maybeValue: $maybeValue) @client
	}
`);
