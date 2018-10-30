import * as React from 'react';
import styled from 'styled-components';
import {VelocityTransitionGroup} from 'velocity-react';

import * as animations from '../../common/animations';
import SearchBackground from './SearchBackground';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import {$Result} from './types';

interface $Props {
	query: string;
	results: $Result[];
	isSearchOpen: boolean;
	enqueue(song: $Result): void;
	setSearch(query: string): void;
	toggleSearch(value?: boolean): void;
	clearSearch(): void;
}

export default function Search({
	query,
	setSearch,
	results,
	enqueue,
	isSearchOpen,
	toggleSearch,
	clearSearch
}: $Props) {
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
	box-shadow: ${(props: $Props) =>
		props.isSearchOpen ? '	0px 4px 6px 4px rgba(0, 0, 0, 0.1)' : 'none'};
`;
