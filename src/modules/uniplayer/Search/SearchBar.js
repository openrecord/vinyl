import * as React from 'react';
import styled from 'styled-components';

import {targetValue} from '../../common/utils';

const StyledSearchBar = styled.input`
	position: fixed;
	z-index: 10;
	font-size: 1.5rem;
	left: 50%;
	transform: translateX(-50%);
	padding: 0.75rem 1rem;
	background-color: rgba(255, 255, 255, 0.6);
	border-radius: 0.25rem;
`;

export default function SearchBar({search, onChange}) {
	return <StyledSearchBar type="text" value={search} onChange={targetValue(onChange)} />;
}
