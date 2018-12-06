import {$SoundCloudResult} from './SoundCloudQueryContainer';
import {$YoutubeResult} from './YoutubeQueryContainer';

export type $Result = $SoundCloudResult | $YoutubeResult;

export type $TrackSource = 'YOUTUBE' | 'SOUNDCLOUD';

export interface $Track {
	id: string;
	index: number;
	playlist: string;
	info: {
		id: string;
		url: string;
		thumbnail: string;
		title: string;
		source: $TrackSource;
	};
}
export interface $Playlist {
	id: string;
	name: string;
	tracks: $Track[];
}
