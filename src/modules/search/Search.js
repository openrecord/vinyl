import React from 'react';
import onClickOutside from 'react-onclickoutside';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class Search extends React.Component {
	handleClickOutside() {
		console.log(this);
		this.props.clearSearch();
	}

	render() {
		const {search, setSearch, results, enqueue} = this.props;

		return (
			<div className="search">
				<SearchBar search={search} onChange={setSearch} />
				{results.length > 0 && <SearchResults results={results} enqueue={enqueue} />}
				{results.length > 0 && <div className="search-background" onClick={this.handleClickOutside} />}
			</div>
		);
	}
}

export default onClickOutside(Search);
