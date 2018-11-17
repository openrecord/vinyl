import * as React from 'react';
import styled from 'styled-components';
import {VelocityTransitionGroup} from 'velocity-react';
import zindex from '../../common/zindex';

import * as animations from '../../common/animations';
import SearchBackground from './SearchBackground';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import {$Result} from './types';
const searchIcon = require('./images/search.svg');
const closeIcon = require('./images/close.svg');

interface $Props {
	query: string;
	results: $Result[];
	isSearchOpen: boolean;
	enqueue(song: $Result): void;
	setSearch(query: string): void;
	toggleSearch(value?: boolean): void;
	clearSearch(): void;
}

interface $SearchHolderProps {
	isSearchOpen: boolean;
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
		<SearchHolder isSearchOpen={isSearchOpen}>
			<VelocityTransitionGroup
				enter={{animation: animations.slideUpExpand.in, duration: 0}}
				leave={animations.slideDownExpand.out}
			>
				<SearchIcon src={searchIcon} />
				{isSearchOpen && <SearchBar query={query} onChange={setSearch} />}
				<CloseButton>
					<img src={closeIcon} />
				</CloseButton>
			</VelocityTransitionGroup>
			<SearchBackground
				isSearchOpen={isSearchOpen}
				toggleSearch={toggleSearch}
				clearSearch={clearSearch}
			>
				<SearchResults results={results} enqueue={enqueue} />
			</SearchBackground>
		</SearchHolder>
	);
}

const SearchHolder = styled.div`
	background: rgb(30, 24, 31);
	border: ${(props: $SearchHolderProps) => (props.isSearchOpen ? '2px solid #9c4d9d' : 'none')};
	box-sizing: border-box;
	bottom: 1rem;
	margin: 0 0.75rem;
	min-width: 22.5rem;
	position: fixed;
	width: calc(30% - 0.75rem);
	z-index: ${zindex('search-holder')};

	div {
		display: flex;
		width: 100%;

		img,
		button {
			display: ${(props: $SearchHolderProps) =>
				props.isSearchOpen ? 'inline-block !important' : 'none'};
		}
	}
`;

//This weirdness is so that you can still click on the Search Icon without closing Search
const SearchIcon = styled.img`
	margin-left: 0.75rem;
	pointer-events: none;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: ${zindex('search-icon')};
`;

const CloseButton = styled.button`
	padding-right: 1rem;
	cursor: pointer;
	height: auto !important;
	opacity: 0.5;

	img {
		margin-top: 2px;
	}

	:hover {
		opacity: 1;
	}
`;
