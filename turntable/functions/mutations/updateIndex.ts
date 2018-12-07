import * as _ from 'lodash';
import gql from 'graphql-tag';
import {findBy, get} from 'shades';

import {Track, Playlist} from '../../generated/prisma';
import {prisma} from '../graphql';

const PlaylistFragment = `
	id
	tracks(orderBy: index_ASC) {
		id
		index
	}
`;

interface $Vars {
	trackId: string;
	newIdx: number;
}

export default async function updateIndex(__root, {trackId, newIdx}: $Vars, __, info) {
	let {playlist} = await prisma.query.track<Track>(
		{where: {id: trackId}},
		gql`
			query {
				playlist {
					${PlaylistFragment}
				}
			}
		`
	);

	playlist = await ensureTrackOrderSequential(playlist);
	const oldIdx = get('tracks', findBy({id: trackId}), 'index')(playlist);

	if (oldIdx === newIdx) {
		return playlist;
	}

	await prisma.mutation.updateTrack({
		where: {id: trackId},
		data: {index: newIdx}
	});

	// Moved down
	if (oldIdx < newIdx) {
		const toMoveDown = playlist.tracks.slice(oldIdx + 1, newIdx + 1);
		await moveBy(toMoveDown, -1);
	}
	// Moved up
	else {
		const toMoveUp = playlist.tracks.slice(newIdx, oldIdx);
		await moveBy(toMoveUp, 1);
	}
	return prisma.query.playlist({where: {id: playlist.id}}, info);
}

const moveBy = (tracks: Track[], amt: number) => Promise.all(tracks.map(moveTrackBy(amt)));

const moveTrackBy = (amt: number) => (track: Track) =>
	prisma.mutation.updateTrack({
		where: {id: track.id},
		data: {index: track.index + amt}
	});

async function ensureTrackOrderSequential(playlist: Playlist) {
	if (playlist.tracks.length === _.last(playlist.tracks).index + 1) {
		return playlist;
	}

	await Promise.all(
		playlist.tracks.map(({id, index}, idx) => {
			if (index !== idx) {
				return prisma.mutation.updateTrack({where: {id}, data: {index: idx}});
			}
		})
	);

	return prisma.query.playlist(
		{where: {id: playlist.id}},
		gql`
			{
				${PlaylistFragment}
			}
		`
	);
}
