import React from 'react';

import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import {toQueryString} from '../../common/utils';

const SOUNDCLOUD_API_KEY = '32eb3539260715fa1251fcf9989263f2';

function getSoundCloudUrl(query) {
	return toQueryString({
		q: query,
		limit: 10,
		client_id: SOUNDCLOUD_API_KEY
	});
}

const query = gql`
	query SOUNDCLOUD_API_KEY($path: String!) {
		soundCloudResults @rest(type: "SoundCloudResult", endpoint: "soundcloud", path: $path) {
			id
			title
			description
			thumbnail: artwork_url
			url: permalink_url
		}
	}
`;

export default ({search, children}) => {
	if (!search) {
		return children({data: {}});
	}
	return (
		<Query
			query={query}
			variables={{path: getSoundCloudUrl(search)}}
			context={{debounceKey: 'SoundCloudSearch'}}
			fetchPolicy="network-only"
		>
			{({data}) => children({data: data ? data.soundCloudResults : []})}
		</Query>
	);
};
