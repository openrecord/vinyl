import * as React from 'react';
import * as _f from 'lodash/fp';

import SoundCloudQueryContainer from './SoundCloudQueryContainer';
import YoutubeQueryContainer from './YoutubeQueryContainer';
import {$Result} from './types';

const interleave = _f.pipe(
	_f.zip,
	_f.flatMap(_f.identity),
	_f.filter<$Result>(Boolean)
);

interface $Props {
	search: string;
	children(results: $Result[]): JSX.Element;
}

export default ({search, children}: $Props) => {
	if (!search) {
		return children([]);
	}
	return (
		<YoutubeQueryContainer search={search}>
			{youtubeResults => (
				<SoundCloudQueryContainer search={search}>
					{soundcloudResults => children(interleave(youtubeResults, soundcloudResults))}
				</SoundCloudQueryContainer>
			)}
		</YoutubeQueryContainer>
	);
};
