import {connect} from 'react-redux';
import React from 'react';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import WithActions from '../../common/components/WithActions';
import * as playerActions from '../state';

const mapStateToProps = ({player}) => ({
	...player,
	results: player.youtubeResults.map(result => ({
		type: 'youtube',
		id: result.id,
		content: result
	}))
});

export default connect(mapStateToProps)(({search, results}) => {
	return (
		<WithActions actions={playerActions.set}>
			{set => (
				<div className="search-container">
					<SearchBar search={search} onChange={set.search} />
					{results.length > 0 && <SearchResults results={results} />}
				</div>
			)}
		</WithActions>
	);
});
