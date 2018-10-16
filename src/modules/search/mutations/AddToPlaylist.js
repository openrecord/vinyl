import gql from 'graphql-tag';

import {mutation} from '../../common/utils';
import PlaylistFragments from '../../common/fragments/PlaylistFragments';

export function variablesForAddToPlaylist(track, playlist) {
	switch (track.__typename) {
		case 'YoutubeResult':
			return {
				url: 'https://www.youtube.com/watch?v=' + track.id.videoId,
				thumbnail: track.snippet.thumbnails.default.url,
				title: track.snippet.title,
				source: 'YOUTUBE',
				playlist
			};
		case 'SoundCloudResult':
			return {
				...track,
				source: 'SOUNDCLOUD',
				playlist
			};
	}
}

export default mutation(gql`
	mutation AddToPlaylist(
		$url: String!
		$thumbnail: String
		$title: String!
		$playlist: String!
		$source: TrackSource!
	) {
		upsertTrackInfo(
			where: {url: $url}
			create: {thumbnail: $thumbnail, title: $title, url: $url, source: $source}
			update: {}
		) {
			id
		}

		upsertPlaylist(where: {name: $playlist}, create: {name: $playlist}, update: {}) {
			id
		}

		updatePlaylist(
			where: {name: $playlist}
			data: {tracks: {create: [{info: {connect: {url: $url}}}]}}
		) {
			...AllPlaylist
		}
	}
	${PlaylistFragments.all}
`);
