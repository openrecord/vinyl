import {ApolloServer, gql} from 'apollo-server-lambda';
import {forwardTo} from 'graphql-binding';
import {importSchema} from 'graphql-import';
import fs from 'mz/fs';
import {always, map, set} from 'shades';

import {Prisma} from '../generated/prisma';
import updateIndex from './mutations/updateIndex';

declare const ENDPOINT: string;

export const prisma = new Prisma({
	endpoint: ENDPOINT
});

async function ls() {
	console.log(await fs.readdir('.'));
	console.log(await fs.readdir('..'));
}
ls();
const forwardToPrisma = map(always(forwardTo('db')));

const server = new ApolloServer({
	typeDefs: gql(importSchema('server.graphql')),
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
