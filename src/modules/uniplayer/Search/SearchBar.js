import * as React from 'react';
import styled from 'styled-components';

import {targetValue} from '../../common/utils';

const StyledSearchBar = styled.input`
	background: #e8e8e8;
	border: 0;
	border-top: 1px solid rgba(50, 50, 50, 0.1);
	border-bottom: 1px solid rgba(50, 50, 50, 0.1);
	border-radius: 0;
	box-sizing: border-box;
	color: rgba(0, 0, 0, 1);
	display: block;
	font-size: 1.25rem;
	outline: none;
	padding: 1rem 1rem;
	position: relative;
	width: 100%;

	&::placeholder {
		color: rgba(0, 0, 0, 0.6);
	}
`;

export default function SearchBar({search, onChange}) {
	return <StyledSearchBar className="search-bar" type="text" value={search} placeholder="Add Song..." onChange={targetValue(onChange)} />;
}
