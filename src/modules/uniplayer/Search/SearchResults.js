import React from 'react';
import styled from 'styled-components';

import YoutubeResult from './YoutubeResult';

export default function SearchResults({results, enqueue, clearSearch, isSearchOpen}) {
	return (
		<StyledSearchResults onClick={clearSearch} className="search-results">
			{results.map(result => {
				switch (result.type) {
					case 'youtube':
						return <YoutubeResult result={result.content} key={result.id} onClick={() => enqueue(result)} />;
					default:
						return null;
				}
			})}
		</StyledSearchResults>
	);
}

const StyledSearchResults = styled.div`
	overflow: hidden;
	overflow-y: scroll;
	max-height: calc(100% - 3.5rem);
	position: absolute;
	width: 100%;
`;
