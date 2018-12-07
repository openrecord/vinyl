import {ApolloServer, gql} from 'apollo-server-lambda';
import {forwardTo} from 'graphql-binding';
import {always, map, set} from 'shades';

import {Prisma} from '../generated/prisma';
import updateIndex from './mutations/updateIndex';
import addToPlaylist from './mutations/addToPlaylist';

declare const ENDPOINT: string;
declare const SCHEMA: string;

if (!global['_babelPolyfill']) {
	require('babel-polyfill');
}

export const prisma = new Prisma({
	endpoint: ENDPOINT
});

const forwardToPrisma = map(always(forwardTo('db')));

const server = new ApolloServer({
	typeDefs: gql(SCHEMA),
	resolvers: {
		Query: forwardToPrisma(prisma.query),
		Mutation: {
			...forwardToPrisma(prisma.mutation),
			updateIndex,
			addToPlaylist
		}
	},
	context: set('db')(prisma)
});

exports.handler = server.createHandler({
	cors: {
		origin: true,
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type']
	}
});
