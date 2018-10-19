import {$SoundCloudResult} from './SoundCloudQueryContainer';
import {$YoutubeResult} from './YoutubeQueryContainer';

export type $Result = $SoundCloudResult | $YoutubeResult;

export interface $Track {
	id: string;
	playlist: string;
	info: {
		url: string;
		thumbnail: string;
		title: string;
		source: 'YOUTUBE' | 'SOUNDCLOUD';
	};
}
