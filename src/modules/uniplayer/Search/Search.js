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
		const {search, setSearch, results: {items} = {items: []}, clearSearch, enqueue} = this.props;

		return (
			<div>
				<SearchBar search={search} onChange={setSearch} />
				{items.length > 0 && <SearchResults results={items} enqueue={enqueue} clearSearch={clearSearch} />}
				{items.length > 0 && <SearchOpaque className="search-opaque" onClick={clearSearch} />}
			</div>
		);
	}
}

const SearchOpaque = styled.div`
	background: rgba(255, 255, 255, 0.8);
	bottom: 0;
	height: calc(100% - 5.25rem);
	position: absolute;
	width: 100%;
`;

export default onClickOutside(Search);
