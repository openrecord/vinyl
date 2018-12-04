import gql from 'graphql-tag';
import {findBy, get} from 'shades';

import {Track} from '../../generated/prisma';
import {prisma} from '../graphql';

export default async function updateIndex(_, {trackId, newIdx}) {
	const {playlist} = await playlistForTrack(trackId);

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

	return playlistForTrack(trackId).then(get('playlist'));
}

const playlistForTrack = (trackId: number) =>
	prisma.query.track<Track>(
		{where: {id: trackId}},
		gql`
			query {
				playlist {
					id
					tracks(orderBy: index_ASC) {
						id
						index
					}
				}
			}
		`
	);

const moveBy = (tracks: Track[], amt: number) => Promise.all(tracks.map(moveTrackBy(amt)));

const moveTrackBy = (amt: number) => (track: Track) =>
	prisma.mutation.updateTrack({
		where: {id: track.id},
		data: {index: track.index + amt}
	});
