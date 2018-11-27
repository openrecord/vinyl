import { MutationUpdaterFn } from 'apollo-client';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

import PlaylistFragments from '../../common/fragments/PlaylistFragments';
import { $Track } from '../../search/components/types';

const mutation = gql`
	mutation CreatePlaylist($playlist: String!) {
		upsertPlaylist(where: {name: $playlist}, create: {name: $playlist}, update: {}) {
			...AllPlaylist
		}
	}

	${PlaylistFragments.all}
`;

interface $MutationPayload {
	upsertPlaylist: {
		id: string;
		name: string;
		tracks: $Track[];
	};
}

export const useCreatePlaylist = (playlist: string) => {
	const createPlaylist = useMutation(mutation);
	return () => createPlaylist({variables: {playlist}, update: createPlaylistUpdate(playlist)});
};

export const createPlaylistUpdate = (playlist: string): MutationUpdaterFn<$MutationPayload> => (
	cache,
	{data: {upsertPlaylist}}: {data: $MutationPayload}
) => {
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
