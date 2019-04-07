'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
const apollo_server_lambda_1 = require('apollo-server-lambda');
const graphql_binding_1 = require('graphql-binding');
const shades_1 = require('shades');
const prisma_1 = require('../generated/prisma');
const updateIndex_1 = __importDefault(require('./mutations/updateIndex'));
const addToPlaylist_1 = __importDefault(require('./mutations/addToPlaylist'));
if (!global['_babelPolyfill']) {
  require('babel-polyfill');
}
exports.prisma = new prisma_1.Prisma({
  endpoint: ENDPOINT
});
const forwardToPrisma = shades_1.map(shades_1.always(graphql_binding_1.forwardTo('db')));
const server = new apollo_server_lambda_1.ApolloServer({
  typeDefs: apollo_server_lambda_1.gql(SCHEMA),
  resolvers: {
    Query: forwardToPrisma(exports.prisma.query),
    Mutation: Object.assign({}, forwardToPrisma(exports.prisma.mutation), {
      updateIndex: updateIndex_1.default,
      addToPlaylist: addToPlaylist_1.default
    })
  },
  context: shades_1.set('db')(exports.prisma)
});
exports.handler = server.createHandler({
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }
});
