import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';

const DELETE_TRACK = gql`
  mutation DeleteTrack($playlist: String!, $trackId: ID!) {
    updatePlaylist(where: {name: $playlist}, data: {tracks: {delete: [{id: $trackId}]}}) {
      id
      tracks {
        id
      }
    }
  }
`;

type $DeleteTrack = (variables: {playlist: string; trackId: string}) => void;

export default function useDeleteTrack(): $DeleteTrack {
  const deleteTrack = useMutation(DELETE_TRACK);
  return variables => deleteTrack({variables});
}
