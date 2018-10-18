import {VelocityTransitionGroup} from 'velocity-react';
import React from 'react';
import styled from 'styled-components';

import SearchBackground from './SearchBackground';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import * as animations from '../../common/animations';

export default function Search({
	query,
	setSearch,
	results,
	enqueue,
	isSearchOpen,
	toggleSearch,
	clearSearch
}) {
	return (
		<SearchHolder>
			<VelocityTransitionGroup
				enter={{animation: animations.slideDownExpand.in, duration: 200}}
				leave={animations.slideDownExpand.out}
			>
				{isSearchOpen && <SearchBar query={query} onChange={setSearch} />}
			</VelocityTransitionGroup>
			<SearchBackground
				isSearchOpen={isSearchOpen}
				toggleSearch={toggleSearch}
				clearSearch={clearSearch}
			>
				{results.length > 0 && <SearchResults results={results} enqueue={enqueue} />}
			</SearchBackground>
		</SearchHolder>
	);
}

const SearchHolder = styled.div`
	background: rgb(36, 36, 36);
	box-shadow: 0px 4px 6px 4px rgba(0, 0, 0, 0.1);
`;
