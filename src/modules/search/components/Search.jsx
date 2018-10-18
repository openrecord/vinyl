import {VelocityTransitionGroup} from 'velocity-react';
import React from 'react';
import styled from 'styled-components';

import onClickOutside from 'react-onclickoutside';

import SearchBackground from './SearchBackground';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import * as animations from '../../common/animations';

class Search extends React.Component {
	handleClickOutside({target: {dataset: {id} = {id: null}}}) {
		if (this.props.isSearchOpen) {
			if (id !== 'show-hide-search') {
				this.props.toggleSearch();
			}
			this.props.clearSearch();
		}
	}

	render() {
		const {query, setSearch, results, enqueue, isSearchOpen} = this.props;

		return (
			<SearchHolder>
				<VelocityTransitionGroup
					enter={{animation: animations.slideDownExpand.in, duration: 200}}
					leave={animations.slideDownExpand.out}
				>
					{isSearchOpen && <SearchBar query={query} onChange={setSearch} />}
				</VelocityTransitionGroup>
				<SearchBackground isSearchOpen={isSearchOpen}>
					{results.length > 0 && <SearchResults results={results} enqueue={enqueue} />}
				</SearchBackground>
			</SearchHolder>
		);
	}
}

const SearchHolder = styled.div`
	background: rgb(36, 36, 36);
	box-shadow: 0px 4px 6px 4px rgba(0, 0, 0, 0.1);
`;

export default onClickOutside(Search);
