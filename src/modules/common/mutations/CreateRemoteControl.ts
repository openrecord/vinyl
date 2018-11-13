import gql from 'graphql-tag';

import {mutation} from '../utils';

export default mutation(gql`
	mutation CreateRemoteControl($action: ControlAction!, $id: ID!) {
		createRemoteControl(data: {action: $action, song: {connect: {id: $id}}}) {
			id
		}
	}
`);
