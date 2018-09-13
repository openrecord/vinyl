import * as queueMutations from '../queue/state/mutations';
import {queue} from '../queue/state';
import * as playerMutations from '../uniplayer/state/mutations';
import {player} from '../uniplayer/state';
import ApolloClient from 'apollo-boost';

export default new ApolloClient({
	uri: 'https://us1.prisma.sh/jamesscottmcnamara/turntable/dev',
	clientState: {
		defaults: {
			queue,
			player
		},
		resolvers: {
			Mutation: {
				...queueMutations,
				...playerMutations
			}
		}
	}
});
