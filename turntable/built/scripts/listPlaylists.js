'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
const prisma_1 = require('../generated/prisma');
const graphql_tag_1 = __importDefault(require('graphql-tag'));
const prettyjson_1 = require('prettyjson');
const prisma = new prisma_1.Prisma({
  endpoint: 'http://localhost:4466'
});
prisma.query
  .playlists(
    null,
    graphql_tag_1.default`
			{
				name
				tracks {
					info {
						title
					}
				}
			}
		`
  )
  .then(prettyjson_1.render)
  .then(console.log);
