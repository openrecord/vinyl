import {toast} from 'react-toastify';
import * as React from 'react';
import {Query} from 'react-apollo';

import gql from 'graphql-tag';

import AddToPlaylist, {variablesForAddToPlaylist} from '../mutations/AddToPlaylist';
import Search from './Search';
import SetSearch from '../mutations/SetSearch';
import Toast from '../../common/components/Toast';
import ToggleSearch from '../../common/mutations/ToggleSearch';
import TrackSearchContainer from './TrackSearchContainer';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import adapt from '../../common/components/Adapt';

const SEARCH_QUERY = gql`
	query SearchContainer {
		search @client {
			query
		}
	}
`;

const Composed = adapt(
	{
		toggleSearch: <ToggleSearch nullary />,
		playlist: <WithPlaylistId />,
		setSearch: <SetSearch variable="query" />,
		addToPlaylist: <AddToPlaylist simple />,
		query: ({render}) => (
			<Query query={SEARCH_QUERY}>{props => render(props.data.search.query)}</Query>
		)
	},
	{
		results: ({query, render}) => (
			<TrackSearchContainer search={query}>
				{props => render(props.data.results)}
			</TrackSearchContainer>
		)
	}
);

export default function SearchContainer(ownProps) {
	return (
		<Composed>
			{({query, playlist, results, setSearch, addToPlaylist, toggleSearch}) => (
				<Search
					{...ownProps}
					toggleSearch={toggleSearch}
					query={query}
					results={results}
					setSearch={setSearch}
					enqueue={track => {
						addToPlaylist(variablesForAddToPlaylist(track, playlist));
						toast(<Toast message="Song Added!" />);
					}}
					clearSearch={() => setSearch('')}
				/>
			)}
		</Composed>
	);
}
