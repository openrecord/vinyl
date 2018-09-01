import React from 'react';
import onClickOutside from 'react-onclickoutside';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class Search extends React.Component {
	handleClickOutside() {
		this.props.clearSearch();
	}

	render() {
		const {search, setSearch, results, enqueue} = this.props;

		return (
			<div className="search">
				<SearchBar search={search} onChange={setSearch} />
				{results.length > 0 && <SearchResults results={results} enqueue={enqueue} />}
			</div>
		);
	}
}

export default onClickOutside(Search);
