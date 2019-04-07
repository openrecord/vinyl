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
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
const _ = __importStar(require('lodash'));
const graphql_tag_1 = __importDefault(require('graphql-tag'));
const shades_1 = require('shades');
const graphql_1 = require('../graphql');
const PlaylistFragment = `
	id
	tracks(orderBy: index_ASC) {
		id
		index
	}
`;
function updateIndex(__root, {trackId, newIdx}, __, info) {
  return __awaiter(this, void 0, void 0, function*() {
    let {playlist} = yield graphql_1.prisma.query.track(
      {where: {id: trackId}},
      graphql_tag_1.default`
			query {
				playlist {
					${PlaylistFragment}
				}
			}
		`
    );
    playlist = yield ensureGaplessTrackOrder(playlist);
    const oldIdx = shades_1.get('tracks', shades_1.findBy({id: trackId}), 'index')(playlist);
    if (oldIdx === newIdx) {
      return playlist;
    }
    yield graphql_1.prisma.mutation.updateTrack({
      where: {id: trackId},
      data: {index: newIdx}
    });
    // Moved down
    if (oldIdx < newIdx) {
      const toMoveDown = playlist.tracks.slice(oldIdx + 1, newIdx + 1);
      yield moveBy(toMoveDown, -1);
    }
    // Moved up
    else {
      const toMoveUp = playlist.tracks.slice(newIdx, oldIdx);
      yield moveBy(toMoveUp, 1);
    }
    return graphql_1.prisma.query.playlist({where: {id: playlist.id}}, info);
  });
}
exports.default = updateIndex;
const moveBy = (tracks, amt) => Promise.all(tracks.map(moveTrackBy(amt)));
const moveTrackBy = amt => track =>
  graphql_1.prisma.mutation.updateTrack({
    where: {id: track.id},
    data: {index: track.index + amt}
  });
function ensureGaplessTrackOrder(playlist) {
  return __awaiter(this, void 0, void 0, function*() {
    if (playlist.tracks.length === _.last(playlist.tracks).index + 1) {
      return playlist;
    }
    yield Promise.all(
      playlist.tracks.map(({id, index}, idx) => {
        if (index !== idx) {
          return graphql_1.prisma.mutation.updateTrack({where: {id}, data: {index: idx}});
        }
      })
    );
    return graphql_1.prisma.query.playlist(
      {where: {id: playlist.id}},
      graphql_tag_1.default`
			{
				${PlaylistFragment}
			}
		`
    );
  });
}
