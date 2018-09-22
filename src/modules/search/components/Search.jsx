import React from 'react';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class Search extends React.Component {
	handleClickOutside() {
		this.props.clearSearch();
	}

	render() {
		const {query, setSearch, results: {items} = {items: []}, clearSearch, enqueue} = this.props;

		return (
			<SearchHolder onClick={clearSearch}>
				<SearchBar query={query} onChange={setSearch} />
				<SearchResults results={items} enqueue={enqueue} clearSearch={clearSearch} />
			</SearchHolder>
		);
	}
}

const SearchHolder = styled.div`
	background: rgba(36, 36, 36);
	box-shadow: 0px 8px 12px 8px rgba(0, 0, 0, 0.2);
	display: block;
	position: relative;
`;

export default onClickOutside(Search);
