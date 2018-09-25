import gql from 'graphql-tag';
import TrackFragments from './TrackFragments';

export default {
	all: gql`
		fragment AllPlaylist on Playlist {
			id
			name
			tracks {
				...AllTrack
			}
		}
		${TrackFragments.all}
	`
};
