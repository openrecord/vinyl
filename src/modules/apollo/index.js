import {defaultDataIdFromObject, InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {ApolloLink, split} from 'apollo-link';
import DebounceLink from 'apollo-link-debounce';
import {onError} from 'apollo-link-error';
import {HttpLink} from 'apollo-link-http';
import {RestLink} from 'apollo-link-rest';
import {withClientState} from 'apollo-link-state';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';

import {player} from '../player/state';
import * as playerMutations from '../player/state/mutations';
import {queue} from '../queue/state';
import * as queueMutations from '../queue/state/mutations';
import {search} from '../search/state';
import * as searchMutations from '../search/state/mutations';

const cache = new InMemoryCache({
	dataIdFromObject: object => {
		switch (object.__typename) {
			case 'YoutubeResult':
				return 'YoutubeResult' + object.id.videoId;
			default:
				return defaultDataIdFromObject(object);
		}
	}
});

export default new ApolloClient({
	addTypename: true,
	link: ApolloLink.from([
		onError(errorHandler),
		withClientState({
			defaults: {
				queue,
				search,
				player
			},
			resolvers: {
				Mutation: {
					...queueMutations,
					...searchMutations,
					...playerMutations
				}
			},
			cache
		}),
		new DebounceLink(250),
		new RestLink({
			endpoints: {
				youtube: 'https://www.googleapis.com/youtube/v3/search',
				soundcloud: 'https://api.soundcloud.com/tracks'
			}
		}),
		split(
			({query}) => {
				const {kind, operation} = getMainDefinition(query);
				return kind === 'OperationDefinition' && operation === 'subscription';
			},
			new WebSocketLink({uri: GRAPHQL_URI.WS, options: {reconnect: true}}),
			new HttpLink({uri: GRAPHQL_URI.HTTP})
		)
	]),
	cache
});

function errorHandler({graphQLErrors, networkError}) {
	if (graphQLErrors) {
		graphQLErrors.map(
			({message, locations, path, operation = {operationName: 'not provided'}, response}) => {
				console.error(
					`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, operation: ${
						operation.operationName
					}`
				);
				console.log('operation', operation);
				console.log('response', response);
			}
		);
	}
	if (networkError) console.log(`[Network error]: ${networkError}`);
}
