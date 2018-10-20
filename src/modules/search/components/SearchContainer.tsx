import gql from 'graphql-tag';
import * as React from 'react';
import {Query} from 'react-apollo';
import {toast} from 'react-toastify';

import adapt from '../../common/components/Adapt';
import Toast from '../../common/components/Toast';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import ToggleSearch from '../../common/mutations/ToggleSearch';
import AddToPlaylist, {$TrackInput, variablesForAddToPlaylist} from '../mutations/AddToPlaylist';
import SetSearch from '../mutations/SetSearch';
import Search from './Search';
import TrackSearchContainer from './TrackSearchContainer';
import {$Result} from './types';

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
		results: ({data, render}: $Renderer & {data: {query: string}}) => (
			<TrackSearchContainer search={data.query}>{render}</TrackSearchContainer>
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
	addToPlaylist(track: $TrackInput): any;
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
