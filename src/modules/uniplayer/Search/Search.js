import React from 'react';
import onClickOutside from 'react-onclickoutside';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class Search extends React.Component {
	handleClickOutside() {
		this.props.clearSearch();
	}

	render() {
		const {search, setSearch, results, clearSearch, enqueue} = this.props;

		return (
			<div>
				<SearchBar search={search} onChange={setSearch} />
				{results.length > 0 && <SearchResults results={results} enqueue={enqueue} clearSearch={clearSearch} />}
			</div>
		);
	}
}

export default onClickOutside(Search);