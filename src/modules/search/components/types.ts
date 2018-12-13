import {$SoundCloudResult} from './useSoundCloud';
import {$YoutubeResult} from './useYoutube';

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
