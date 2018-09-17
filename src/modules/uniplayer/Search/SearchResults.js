import React from 'react';
import styled from 'styled-components';

import YoutubeResult from './YoutubeResult';

export default function SearchResults({results, enqueue, clearSearch}) {
	return (
		<StyledSearchResults onClick={clearSearch} className="search-results">
			{results.map(result => {
				switch (result.type) {
					case 'youtube':
						return <YoutubeResult search result={result.content} key={result.id} onClick={() => enqueue(result)} />;
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

	::-webkit-scrollbar {
		display: none;
	}
`;
