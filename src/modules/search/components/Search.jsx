import React from 'react';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import {VelocityTransitionGroup} from 'velocity-react';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import zindex from '../../common/zindex';
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
				<VelocityTransitionGroup
					enter={{animation: 'slideDown', delay: 200, duration: 700}}
					leave="slideUp"
				>
					{isSearchOpen && (
						<SearchBackground onClick={this.props.toggleSearch}>
							{results.length > 0 && <SearchResults results={results} enqueue={enqueue} />}
						</SearchBackground>
					)}
				</VelocityTransitionGroup>
			</SearchHolder>
		);
	}
}

const getSearchBackgroundHeight = () => {
	const queue = document.querySelector('#queue');
	const height = queue ? Math.max(queue.offsetHeight, 200) : 200;
	return height + 'px';
};

const SearchHolder = styled.div`
	background: rgb(36, 36, 36);
	box-shadow: 0px 4px 6px 4px rgba(0, 0, 0, 0.1);
`;

const SearchBackground = styled.div`
	background: rgba(25, 25, 25, 0.97);
	width: 100%;
	height: ${getSearchBackgroundHeight};
	position: absolute;
	z-index: ${zindex('search-background')};
`;

export default onClickOutside(Search);
