import {mutation} from '../utils';
import gql from 'graphql-tag';

export default mutation(gql`
	mutation ToggleSearch {
		toggleSearch @client
	}
`);
