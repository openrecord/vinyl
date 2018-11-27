import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

const CREATE_REMOTE_CONTROL = gql`
	mutation CreateRemoteControl($action: ControlAction!, $id: ID!) {
		createRemoteControl(data: {action: $action, song: {connect: {id: $id}}}) {
			id
		}
	}
`;

type $ControlAction = 'PLAY' | 'PAUSE' | 'SET';
type $CreateRemoteControl = (options: {action: $ControlAction; id: string}) => void;

export default function useCreateRemoteControl(): $CreateRemoteControl {
	const createRemoteControl = useMutation(CREATE_REMOTE_CONTROL);
	return variables => createRemoteControl({variables});
}
