import gql from 'graphql-tag';

import {mutation} from '../../common/utils';
import PlaylistFragments from '../../common/fragments/PlaylistFragments';

export default mutation(gql`
	mutation CreatePlaylist($playlist: String!) {
		upsertPlaylist(where: {name: $playlist}, create: {name: $playlist}, update: {}) {
			...AllPlaylist
		}
	}

	${PlaylistFragments.all}
`);

export const createPlaylistUpdate = playlist => (cache, {data: {upsertPlaylist}}) => {
	const query = gql`
		query CreatePlaylistUpdate($playlist: String!) {
			playlist(where: {name: $playlist}) {
				...AllPlaylist
			}
		}
		${PlaylistFragments.all}
	`;
	cache.writeQuery({query, data: {playlist: upsertPlaylist}, variables: {playlist}});
};
