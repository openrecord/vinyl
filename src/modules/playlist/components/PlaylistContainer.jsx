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
	query PlaylistQuery($playlist: String!) {
		search @client {
			isSearchOpen
		}

		playlist(where: {name: $playlist}) {
			id
			tracks {
				id
			}
		}
	}
`;

const Composed = adapt(
	{
		toggleSearch: <Mutation mutation={TOGGLE_SEARCH} />,
		playlist: <WithPlaylistId />
	},
	{
		data: ({render, playlist}) => (
			<Query query={query} variables={{playlist}}>
				{props => render(props.data)}
			</Query>
		)
	}
);

export default function PlaylistContainer() {
	return (
		<Composed>
			{({
				data: {search: {isSearchOpen} = {isSearchOpen: false}, playlist: {tracks} = {tracks: []}},
				toggleSearch,
				playlist
			}) => (
				<Playlist
					playlist={playlist}
					isSearchOpen={isSearchOpen}
					toggleSearch={toggleSearch}
					trackCount={tracks.length}
				/>
			)}
		</Composed>
	);
}
