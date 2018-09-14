import React from 'react';
import styled from 'styled-components';

import YoutubeResult from './YoutubeResult';

export default function SearchResults({results, enqueue, clearSearch}) {
	return (
		<StyledSearchResults onClick={clearSearch} className="search-results">
			{results.map(result => {
				switch (result.__typename) {
					case 'YoutubeResult':
						return <YoutubeResult search snippet={result.snippet} key={result.id.videoId} onClick={() => enqueue(result)} />;
					default:
						return null;
				}
			})}
		</StyledSearchResults>
	);
}

const StyledSearchResults = styled.div`
	background: rgba(25, 25, 25);
	overflow: hidden;
	overflow-y: scroll;
	max-height: calc(100% - 20.75rem);
	position: absolute;
	width: 100%;

	::-webkit-scrollbar {
		display: none;
	}
`;
