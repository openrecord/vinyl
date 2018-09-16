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
		const {search, setSearch, results, clearSearch, enqueue} = this.props;

		return (
			<SearchHolder>
				<SearchBar search={search} onChange={setSearch} />
				{results.length > 0 && <SearchResults results={results} enqueue={enqueue} clearSearch={clearSearch} />}
				{results.length > 0 && <SearchOpaque className="search-opaque" onClick={clearSearch} />}
			</SearchHolder>
		);
	}
}

const SearchHolder = styled.div`
	position: relative;
	width: 100%;
`;

const SearchOpaque = styled.div`
	background: rgba(15, 15, 15, 0.9);
	bottom: 0;
	height: 100vh;
	position: relative;

	max-height: calc(100vh - 20rem);
	width: 100%;
`;

export default onClickOutside(Search);
