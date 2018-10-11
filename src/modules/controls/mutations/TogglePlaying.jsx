import gql from 'graphql-tag';
import {mutation} from '../../common/utils';

export default mutation(gql`
	mutation togglePlaying($maybeValue: Boolean) {
		togglePlaying(maybeValue: $maybeValue) @client
	}
`);
