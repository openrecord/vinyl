import {connect} from 'react-redux';
import React from 'react';

import Search from './search';
import * as playerActions from '../uniplayer/state';
import * as queueActions from '../queue/state';

const mapStateToProps = ({player}) => ({
	...player,
	results: player.youtubeResults
});

const mapDispatchToProps = {
	setSearch: playerActions.set.search,
	enqueue: queueActions.enqueue,
	clearSearch: () => playerActions.set.search('')
};

export default connect(mapStateToProps, mapDispatchToProps)(({search, results, setSearch, enqueue, clearSearch}) => {
	return <Search search={search} results={results} setSearch={setSearch} enqueue={enqueue} clearSearch={clearSearch} />;
});
