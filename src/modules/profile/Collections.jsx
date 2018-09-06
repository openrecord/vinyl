import React from 'react';

import styled from 'styled-components';

export default function Collections() {
	return (
		<CollectionsOuter>
			<div className="collection" />
		</CollectionsOuter>
	);
}

const CollectionsOuter = styled.div`
	display: block;
	background: white;
	width: 100%;

	.collection {
		display: inline-block;
	}
`;
