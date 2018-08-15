import {connect} from 'react-redux';
import React from 'react';

import SearchBar from './SearchBar';
import * as playerActions from '../state';

const mapStateToProps = ({player}) => player;

export default connect(
	mapStateToProps,
	playerActions
)(({search, setSearch}) => <SearchBar search={search} onChange={setSearch} />);
