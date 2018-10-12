import React from 'react';
import styled from 'styled-components';

import Track from './Track';
import zindex from '../../common/zindex';

export default function SearchResults({results, enqueue}) {
	return (
		<StyledSearchResults>
			{results.map(result => {
				switch (result.__typename) {
					case 'YoutubeResult':
						return (
							<Track
								search
								thumbnail={result.snippet.thumbnails.default.url}
								title={result.snippet.title}
								key={result.id.videoId}
								onClick={() => enqueue(result)}
								youtube
							/>
						);
					case 'SoundCloudResult':
						return (
							<Track
								search
								thumbnail={result.thumbnail}
								title={result.title}
								key={result.id}
								onClick={() => enqueue(result)}
								soundcloud
							/>
						);
					default:
						return null;
				}
			})}
		</StyledSearchResults>
	);
}

const StyledSearchResults = styled.div`
	position: absolute;
	z-index: ${zindex('search-results')};
	background: rgba(25, 25, 25);
	display: block;
	max-height: 30rem;
	overflow: hidden;
	overflow-y: scroll;
	width: 100%;
	box-shadow: 0px 4px 6px 4px rgba(0, 0, 0, 0.2);

	::-webkit-scrollbar {
		display: none;
	}
`;
