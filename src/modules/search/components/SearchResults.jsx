import React from 'react';
import styled from 'styled-components';

import Track from './Track';

export default function SearchResults({results, enqueue}) {
	return (
		<StyledSearchResults className="search-results">
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
