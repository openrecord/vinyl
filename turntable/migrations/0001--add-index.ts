import gql from 'graphql-tag';

import {prisma} from '.';

export default async () => {
	const playlists = await prisma.query.playlists(
		{},
		gql`
			query {
				tracks {
					id
				}
			}
		`
	);

	playlists.forEach(playlist => {
		playlist.tracks.forEach((track, index) => {
			prisma.mutation.updateTrack({data: {index}, where: {id: track.id}});
		});
	});
};
