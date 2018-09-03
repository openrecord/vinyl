import * as React from 'react';
import styled from 'styled-components';

import {targetValue} from '../common/utils';

const StyledSearchBar = styled.input``;

export default function SearchBar({search, onChange}) {
	return <StyledSearchBar type="text" placeholder="Start typing..." value={search} onChange={targetValue(onChange)} />;
}
