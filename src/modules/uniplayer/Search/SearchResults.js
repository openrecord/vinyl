import React from 'react';
import styled from 'styled-components';

import YoutubeResult from './YoutubeResult';

export default function SearchResults({results, enqueue, clearSearch}) {
	return (
		<StyledSearchResults onClick={clearSearch} className="search-results">
			{results.map(result => {
				switch (result.__typename) {
					case 'YoutubeResult':
						return <YoutubeResult snippet={result.snippet} key={result.id.videoId} onClick={() => enqueue(result)} />;
					default:
						return null;
				}
			})}
		</StyledSearchResults>
	);
}

const StyledSearchResults = styled.div`
	background: white;
	overflow: hidden;
	overflow-y: scroll;
	max-height: calc(100% - 8.75rem);
	position: absolute;
	width: 100%;
`;
