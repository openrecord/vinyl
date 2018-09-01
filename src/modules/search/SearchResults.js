import React from 'react';
import styled from 'styled-components';

import YoutubeResult from './YoutubeResult';

const StyledSearchResults = styled.div`
	background: #f2f2f2;
`;

export default function SearchResults({results, enqueue}) {
	return (
		<StyledSearchResults>
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
