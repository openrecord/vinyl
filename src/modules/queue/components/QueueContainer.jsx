import React from 'react';

import {Query, Mutation} from 'react-apollo';
import Queue from './Queue';
import gql from 'graphql-tag';
import {adopt} from 'react-adopt';
import {Youtube} from '../../search/components/YoutubeQueryContainer';

const TOGGLE_SEARCH = gql`
	mutation ToggleSearch {
		toggleSearch @client
	}
`;

const QUEUE_QUERY = gql`
	query Queue {
		queue @client {
			tracks {
				...YoutubeEntry
			}
		}

		search {
			isSearchOpen
		}
	}
	${Youtube.fragments.result}
`;

const Composed = adopt({
	data: ({render}) => <Query query={QUEUE_QUERY}>{({data}) => render(data)}</Query>,
	toggleSearch: <Mutation mutation={TOGGLE_SEARCH} />
});

export default () => (
	<Composed>
		{({
			data: {
				queue: {tracks},
				search: {isSearchOpen}
			},
			toggleSearch
		}) => <Queue tracks={tracks} isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />}
	</Composed>
);
