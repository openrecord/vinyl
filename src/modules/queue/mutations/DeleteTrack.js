import gql from 'graphql-tag';
import {mutation} from '../../common/utils';

export default mutation(gql`
	mutation DeleteTrack($playlist: String!, $trackId: ID!) {
		updatePlaylist(where: {name: $playlist}, data: {tracks: {delete: [{id: $trackId}]}}) {
			id
			tracks {
				id
			}
		}
	}
`);
