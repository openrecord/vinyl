import React from 'react';
import styled from 'styled-components';

import YoutubeResult from './YoutubeResult';

const StyledSearchResults = styled.div`
	background: #f2f2f2;
	margin-top: 0.25rem;
	overflow: hidden;
	overflow-y: scroll;
	max-height: 32rem;
	position: absolute;
	width: 100%;
	z-index: 1;
`;

export default function SearchResults({results, enqueue, clearSearch, isSearchOpen}) {
	return (
		<StyledSearchResults onClick={clearSearch} className={isSearchOpen ? 'large' : ''}>
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
