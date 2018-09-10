import * as React from 'react';
import styled from 'styled-components';

import {targetValue} from '../../common/utils';

const StyledSearchBar = styled.input`
	background: transparent;
	border: 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 0;
	box-sizing: border-box;
	color: rgba(255, 255, 255, 1);
	display: block;
	font-size: 1.25rem;
	outline: none;
	padding: 1rem 1rem;
	position: relative;
	width: 100%;

	&::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}
`;

export default function SearchBar({search, onChange}) {
	return (
		<StyledSearchBar className="search-bar" type="text" value={search} placeholder="Start Typing..." onChange={targetValue(onChange)} />
	);
}
