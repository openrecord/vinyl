import {Prisma} from '../generated/prisma';
import gql from 'graphql-tag';

const prisma = new Prisma({
	endpoint: 'http://localhost:4466'
});

const name = process.argv[process.argv.length - 1];

prisma.query
	.playlists(
		{where: {name}},
		gql`
			{
				tracks {
					id
					info {
						id
					}
				}
			}
		`
	)
	.then(([{tracks}]) => ({
		trackIds: tracks.map(t => t.id),
		trackInfoIds: tracks.map(track => track.info.id)
	}))
	.then(({trackIds, trackInfoIds}) =>
		prisma.mutation
			.deleteManyTrackInfoes(
				{where: {id_in: trackInfoIds}},
				gql`
					{
						count
					}
				`
			)
			.then(_ =>
				prisma.mutation.deleteManyTracks(
					{where: {id_in: trackIds}},
					gql`
						{
							count
						}
					`
				)
			)
	);
