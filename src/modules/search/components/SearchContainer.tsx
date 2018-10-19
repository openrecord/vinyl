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
import {$Result, $Track} from './types';

const SEARCH_QUERY = gql`
	query SearchContainer {
		search @client {
			query
			isSearchOpen
		}
	}
`;

interface $Renderer {
	render(args: any): JSX.Element;
}
const Composed = adapt(
	{
		toggleSearch: <ToggleSearch thunk />,
		playlist: <WithPlaylistId />,
		setSearch: <SetSearch variable="query" />,
		addToPlaylist: <AddToPlaylist simple />,
		data: ({render}: $Renderer) => (
			<Query query={SEARCH_QUERY}>{props => render(props.data.search)}</Query>
		)
	},
	{
		results: ({query, render}: $Renderer & {query: string}) => (
			<TrackSearchContainer search={query}>{render}</TrackSearchContainer>
		)
	}
);

interface $Props {
	data: {
		isSearchOpen: boolean;
		query: string;
	};
	results: $Result[];
	playlist: string;
	toggleSearch(): any;
	setSearch(query: string): any;
	addToPlaylist(track: $Track): any;
}

export default function SearchContainer() {
	return (
		<Composed>
			{({
				data: {query, isSearchOpen},
				playlist,
				results,
				setSearch,
				addToPlaylist,
				toggleSearch
			}: $Props) => (
				<Search
					isSearchOpen={isSearchOpen}
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
