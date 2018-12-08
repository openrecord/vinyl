import gql from 'graphql-tag';
import * as _ from 'lodash';

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

	const BATCH_SIZE = 16;

	for (const playlist of playlists) {
		const trackBatches = _.chunk(playlist.tracks, BATCH_SIZE);
		for (let batchIndex = 0; batchIndex < trackBatches.length; batchIndex++) {
			await Promise.all(
				trackBatches[batchIndex].map((track, index) =>
					prisma.mutation.updateTrack({
						data: {index: batchIndex * BATCH_SIZE + index},
						where: {id: track.id}
					})
				)
			);
		}
	}
};
