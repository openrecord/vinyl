import * as React from 'react';
import styled from 'styled-components';

import {targetValue} from '../../common/utils';

const StyledSearchBar = styled.input`
	background: #efefef;
	border: 0;
	border-bottom: 1px solid #cccccc;
	border-radius: 0;
	box-sizing: border-box;
	display: block;
	font-size: 1.25rem;
	outline: none;
	padding: 1rem 1rem;
	width: 100%;
`;

export default function SearchBar({search, onChange}) {
	return <StyledSearchBar type="text" value={search} placeholder="Add Song..." onChange={targetValue(onChange)} />;
}
