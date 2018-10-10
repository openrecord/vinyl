import React from 'react';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';
import {device} from '../../../styles/utilities/device';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class Search extends React.Component {
	handleClickOutside({target: {dataset: {id} = {id: null}}}) {
		if (id !== 'show-hide-search') {
			this.props.toggleSearch();
		}
		this.props.clearSearch();
	}

	render() {
		const {query, setSearch, results, enqueue} = this.props;

		return (
			<SearchHolder>
				<SearchBar query={query} onChange={setSearch} />
				{results.length > 0 && <SearchResults results={results} enqueue={enqueue} />}
				<SearchBackground className="search-background" onClick={this.props.toggleSearch} />
			</SearchHolder>
		);
	}
}

const SearchHolder = styled.div`
	background: rgba(36, 36, 36);
	box-shadow: 0px 4px 6px 4px rgba(0, 0, 0, 0.1);
`;

const SearchBackground = styled.div`
	background: rgba(25, 25, 25, 0.97);
	width: 100%;
	height: ${_ => Math.max(document.querySelector('#queue').offsetHeight, 200) + 'px'};
	position: absolute;
`;

export default onClickOutside(Search);
