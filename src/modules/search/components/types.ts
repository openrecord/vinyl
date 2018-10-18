export interface $SoundCloudResult {
	__typename: 'SoundCloudResult';
	id: number;
	title: string;
	description: string;
	thumbnail: string | null;
	url: string;
}

export interface $YoutubeResult {
	__typename: 'YoutubeResult';
	id: {
		videoId: string;
	};
	snippet: {
		title: string;
		thumbnails: {
			default: {
				url: string;
			};
			high: {
				url: string;
			};
		};
	};
}

export type $Result = $SoundCloudResult | $YoutubeResult;
