import merge from 'deepmerge';
import gql from 'graphql-tag';
import * as React from 'react';
import {Query} from 'react-apollo';

import adapt from '../../common/components/Adapt';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import ToggleLive from '../../common/mutations/ToggleLive';
import ToggleSearch from '../../common/mutations/ToggleSearch';
import {nullToUndefined} from '../../common/utils';
import CreatePlaylist, {createPlaylistUpdate} from '../mutations/CreatePlaylist';
import Playlist from './Playlist';

const query = gql`
	query PlaylistQuery($playlist: String!) {
		search @client {
			isSearchOpen
		}

		player @client {
			live
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
		toggleSearch: <ToggleSearch nullary />,
		playlist: <WithPlaylistId />
	},
	{
		data: ({render, playlist}) => (
			<Query query={query} variables={{playlist}}>
				{props =>
					render(
						merge(
							{search: {isSearchOpen: false}, playlist: {tracks: []}, player: {live: false}},
							nullToUndefined(props.data)
						)
					)
				}
			</Query>
		),
		createPlaylist: ({render, playlist}) => (
			<CreatePlaylist variables={{playlist}} update={createPlaylistUpdate(playlist)}>
				{render}
			</CreatePlaylist>
		),
		toggleLive: <ToggleLive toggle="live" />
	}
);

export default function PlaylistContainer() {
	return (
		<Composed>
			{({
				data: {
					search: {isSearchOpen},
					playlist: {tracks},
					player: {live}
				},
				toggleSearch,
				toggleLive,
				playlist,
				createPlaylist
			}) => (
				<Playlist
					live={live}
					playlist={playlist}
					isSearchOpen={isSearchOpen}
					toggleSearch={toggleSearch}
					trackCount={tracks.length}
					createPlaylist={createPlaylist}
					toggleLive={toggleLive}
				/>
			)}
		</Composed>
	);
}
