'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
const prisma_1 = require('../generated/prisma');
const graphql_tag_1 = __importDefault(require('graphql-tag'));
const prisma = new prisma_1.Prisma({
  endpoint: 'http://localhost:4466'
});
const name = process.argv[process.argv.length - 1];
prisma.query
  .playlists(
    {where: {name}},
    graphql_tag_1.default`
			{
				tracks {
					id
					info {
						id
					}
				}
			}
		`
  )
  .then(([{tracks}]) => ({
    trackIds: tracks.map(t => t.id),
    trackInfoIds: tracks.map(track => track.info.id)
  }))
  .then(({trackIds, trackInfoIds}) =>
    prisma.mutation
      .deleteManyTrackInfoes(
        {where: {id_in: trackInfoIds}},
        graphql_tag_1.default`
					{
						count
					}
				`
      )
      .then(_ =>
        prisma.mutation.deleteManyTracks(
          {where: {id_in: trackIds}},
          graphql_tag_1.default`
						{
							count
						}
					`
        )
      )
  );
