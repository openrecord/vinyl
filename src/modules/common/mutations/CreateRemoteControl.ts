import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';

import {mutation} from '../utils';

const CREATE_REMOTE_CONTROL = gql`
	mutation CreateRemoteControl($action: ControlAction!, $id: ID!) {
		createRemoteControl(data: {action: $action, song: {connect: {id: $id}}}) {
			id
		}
	}
`;

export default mutation(CREATE_REMOTE_CONTROL);

type $ControlAction = 'PLAY' | 'PAUSE' | 'SET';

export function useCreateRemoteControl(): (options: {action: $ControlAction; id: string}) => void {
	const createRemoteControl = useMutation(CREATE_REMOTE_CONTROL);
	return variables => createRemoteControl({variables});
}
