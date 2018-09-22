import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import React from 'react';
import Playlist from './Playlist';
import adapt from '../../common/components/Adapt';

const TOGGLE_SEARCH = gql`
	mutation ToggleSearch {
		toggleSearch @client
	}
`;

const query = gql`
	query PlaylistQuery {
		search @client {
			isSearchOpen
		}
	}
`;

const Composed = adapt({
	toggleSearch: <Mutation mutation={TOGGLE_SEARCH} />,
	playlist: <WithPlaylistId />,
	search: ({render}) => <Query query={query}>{({data: {search}}) => render(search)}</Query>
});

export default function PlaylistContainer() {
	return (
		<Composed>
			{({search: {isSearchOpen}, toggleSearch, playlist}) => (
				<Playlist playlist={playlist} isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
			)}
		</Composed>
	);
}
