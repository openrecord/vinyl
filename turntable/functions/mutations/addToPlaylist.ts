import gql from 'graphql-tag';
import {prisma} from '../graphql';
import {TrackSource} from '../../generated/prisma';

interface $Vars {
	url: string;
	thumbnail: string;
	playlist: string;
	title: string;
	source: TrackSource;
}

export default async function addToPlaylist(
	_,
	{url, thumbnail, title, playlist, source}: $Vars,
	__,
	info
) {
	await Promise.all([
		prisma.mutation.upsertTrackInfo({
			where: {url},
			create: {thumbnail, title, url, source},
			update: {}
		}),

		prisma.mutation.upsertPlaylist({
			where: {name: playlist},
			create: {name: playlist},
			update: {}
		})
	]);

	const {tracks} = await prisma.query.playlist(
		{where: {name: playlist}},
		gql`
			query {
				tracks {
					id
				}
			}
		`
	);

	return prisma.mutation.updatePlaylist(
		{
			where: {name: playlist},
			data: {tracks: {create: [{index: tracks.length, info: {connect: {url}}}]}}
		},
		info
	);
}
