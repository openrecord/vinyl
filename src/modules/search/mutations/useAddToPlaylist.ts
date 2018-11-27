import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';

import PlaylistFragments from '../../common/fragments/PlaylistFragments';
import {$Nullable} from '../../common/utils';
import {$Result, $TrackSource} from '../components/types';

export function variablesForAddToPlaylist(track: $Result, playlist: string): $TrackInput {
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
interface $TrackInput {
	url: string;
	thumbnail: $Nullable<string>;
	title: string;
	source: $TrackSource;
	playlist: string;
}

type $AddToPlaylist = (track: $Result, playlist: string) => void;

const ADD_TO_PLAYLIST = gql`
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
`;

export default function useAddToPlaylist(): $AddToPlaylist {
	const addToPlaylist = useMutation(ADD_TO_PLAYLIST);
	return (track, playlist) =>
		addToPlaylist({variables: variablesForAddToPlaylist(track, playlist)});
}
