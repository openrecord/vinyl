import {ApolloServer, gql} from 'apollo-server-lambda';
import {forwardTo} from 'graphql-binding';
import {always, map, set} from 'shades';

import {Prisma} from '../generated/prisma';
import updateIndex from './mutations/updateIndex';

declare const ENDPOINT: string;
declare const SCHEMA: string;

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
			updateIndex
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
