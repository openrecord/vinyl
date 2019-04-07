'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
const graphql_tag_1 = __importDefault(require('graphql-tag'));
const graphql_1 = require('../graphql');
function addToPlaylist(_, {url, thumbnail, title, playlist, source}, __, info) {
  return __awaiter(this, void 0, void 0, function*() {
    yield Promise.all([
      graphql_1.prisma.mutation.upsertTrackInfo({
        where: {url},
        create: {thumbnail, title, url, source},
        update: {}
      }),
      graphql_1.prisma.mutation.upsertPlaylist({
        where: {name: playlist},
        create: {name: playlist},
        update: {}
      })
    ]);
    const {tracks} = yield graphql_1.prisma.query.playlist(
      {where: {name: playlist}},
      graphql_tag_1.default`
			query {
				tracks {
					id
				}
			}
		`
    );
    return graphql_1.prisma.mutation.updatePlaylist(
      {
        where: {name: playlist},
        data: {tracks: {create: [{index: tracks.length, info: {connect: {url}}}]}}
      },
      info
    );
  });
}
exports.default = addToPlaylist;
