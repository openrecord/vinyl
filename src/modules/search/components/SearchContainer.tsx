import * as React from 'react';
import { toast } from 'react-toastify';

import adapt from '../../common/components/Adapt';
import Toast from '../../common/components/Toast';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import { useStore } from '../../store';
import AddToPlaylist, { $TrackInput, variablesForAddToPlaylist } from '../mutations/AddToPlaylist';
import Search from './Search';
import TrackSearchContainer from './TrackSearchContainer';

const Composed = adapt({
	playlist: <WithPlaylistId />,
	addToPlaylist: <AddToPlaylist simple />
});

interface $Props {
	playlist: string;
	addToPlaylist(track: $TrackInput): any;
}

export default function SearchContainer() {
	const {
		state: {
			search: {query, isSearchOpen}
		},
		actions: {
			search: {toggle, setter}
		}
	} = useStore();
	return (
		<Composed>
			{({playlist, addToPlaylist}: $Props) => (
				<TrackSearchContainer search={query}>
					{results => (
						<Search
							isSearchOpen={isSearchOpen}
							toggleSearch={toggle('isSearchOpen')}
							query={query}
							results={results}
							setSearch={setter('query')}
							enqueue={track => {
								addToPlaylist(variablesForAddToPlaylist(track, playlist));
								toast(<Toast message="Song Added!" />);
							}}
							clearSearch={() => setter('query')('')}
						/>
					)}
				</TrackSearchContainer>
			)}
		</Composed>
	);
}
