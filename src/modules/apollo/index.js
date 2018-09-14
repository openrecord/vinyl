import * as queueMutations from '../queue/state/mutations';
import {queue} from '../queue/state';
import * as playerMutations from '../uniplayer/state/mutations';
import {player} from '../uniplayer/state';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory';
import {onError} from 'apollo-link-error';
import {withClientState} from 'apollo-link-state';
import {HttpLink} from 'apollo-link-http';
import {ApolloLink} from 'apollo-link';
import {RestLink} from 'apollo-link-rest';
import DebounceLink from 'apollo-link-debounce';

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
	link: ApolloLink.from([
		onError(errorHandler),
		withClientState({
			defaults: {
				queue,
				player
			},
			resolvers: {
				Mutation: {
					...queueMutations,
					...playerMutations
				}
			},
			cache
		}),
		new DebounceLink(500),
		new RestLink({
			endpoints: {
				youtube: 'https://www.googleapis.com/youtube/v3/search'
			}
		}),
		new HttpLink({uri: 'https://us1.prisma.sh/jamesscottmcnamara/turntable/dev'})
	]),
	cache
});
function errorHandler({graphQLErrors, networkError}) {
	if (graphQLErrors)
		graphQLErrors.map(({message, locations, path}) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
}
