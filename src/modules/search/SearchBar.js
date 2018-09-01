import * as React from 'react';
import styled from 'styled-components';

import {targetValue} from '../common/utils';

const StyledSearchBar = styled.input`
	display: block;
	margin: auto;
	font-size: 1.5rem;
	padding: 0.75rem 1rem;
	background-color: rgba(255, 255, 255, 0.6);
	border-radius: 0.25rem;
`;

export default function SearchBar({search, onChange}) {
	return <StyledSearchBar type="text" placeholder="Add Song" value={search} onChange={targetValue(onChange)} />;
}
