import gql from 'graphql-tag';
import {mutation} from '../../common/utils';

export default mutation(gql`
	mutation SetPlayed($played: Float!) {
		setPlayed(played: $played) @client
	}
`);
