import React from 'react';
import _f from 'lodash/fp';

import SoundCloudQueryContainer from './SoundCloudQueryContainer';
import YoutubeQueryContainer from './YoutubeQueryContainer';

const interleave = _f.pipe(
	_f.zip,
	_f.flatMap(_f.identity),
	_f.filter(_f.identity)
);

export default ({search, children}) => {
	if (!search) {
		return children({data: {results: []}});
	}
	return (
		<YoutubeQueryContainer search={search}>
			{({data: youtubeResults}) => (
				<SoundCloudQueryContainer search={search}>
					{({data: soundcloudResults}) =>
						children({data: {results: interleave(youtubeResults, soundcloudResults)}})
					}
				</SoundCloudQueryContainer>
			)}
		</YoutubeQueryContainer>
	);
};
