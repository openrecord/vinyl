import {connect} from 'react-redux';
import React from 'react';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import * as playerActions from '../state';
import * as queueActions from '../../queue/state';

const mapStateToProps = ({player}) => ({
	...player,
	results: player.youtubeResults
});

const mapDispatchToProps = {
	setSearch: playerActions.set.search,
	enqueue: queueActions.enqueue
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(({search, results, setSearch, enqueue}) => {
	return (
		<div className="search-container">
			<SearchBar search={search} onChange={setSearch} />
			{results.length > 0 && <SearchResults results={results} enqueue={enqueue} />}
		</div>
	);
});
