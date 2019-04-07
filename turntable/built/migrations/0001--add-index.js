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
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
Object.defineProperty(exports, '__esModule', {value: true});
const graphql_tag_1 = __importDefault(require('graphql-tag'));
const _ = __importStar(require('lodash'));
const _1 = require('.');
exports.default = () =>
  __awaiter(this, void 0, void 0, function*() {
    const playlists = yield _1.prisma.query.playlists(
      {},
      graphql_tag_1.default`
			query {
				tracks {
					id
				}
			}
		`
    );
    const BATCH_SIZE = 16;
    for (const playlist of playlists) {
      const trackBatches = _.chunk(playlist.tracks, BATCH_SIZE);
      for (let batchIndex = 0; batchIndex < trackBatches.length; batchIndex++) {
        yield Promise.all(
          trackBatches[batchIndex].map((track, index) =>
            _1.prisma.mutation.updateTrack({
              data: {index: batchIndex * BATCH_SIZE + index},
              where: {id: track.id}
            })
          )
        );
      }
    }
  });
