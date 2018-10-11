import gql from 'graphql-tag';
import {mutation} from '../../common/utils';

export default mutation(gql`
	mutation SetDuration($duration: Float!) {
		setDuration(duration: $duration) @client
	}
`);
