import './search.scss';

import {connect} from 'react-redux';
import React from 'react';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import * as playerActions from '../state';

const mapStateToProps = ({player}) => ({
	...player,
	results: player.youtubeResults.map(result => ({
		type: 'youtube',
		id: result.id,
		content: result
	}))
});

export default connect(
	mapStateToProps,
	playerActions
)(({search, results, setSearch}) => (
	<div className="search-container">
		<SearchBar search={search} onChange={setSearch} />
		{results.length > 0 && <SearchResults results={results} />}
	</div>
));
