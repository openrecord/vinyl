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
Object.defineProperty(exports, '__esModule', {value: true});
const path = __importStar(require('path'));
const shades_1 = require('shades');
const prisma_1 = require('../generated/prisma');
const fs = require('mz/fs');
exports.prisma = new prisma_1.Prisma({
  endpoint: process.env.ENDPOINT
});
function runMigration(index, name, migration) {
  return __awaiter(this, void 0, void 0, function*() {
    const existingMigration = yield exports.prisma.query.migration({where: {index}});
    if (existingMigration) {
      return;
    }
    yield migration();
    yield exports.prisma.mutation.createMigration({data: {index, name}});
  });
}
exports.runMigration = runMigration;
const migrationRE = /(\d{4})--(.*).js/;
const isMigration = migrationRE.test.bind(migrationRE);
const toMigration = filename => {
  const [_, idx, name] = filename.match(migrationRE);
  return {
    index: parseInt(idx),
    name,
    code: require(path.resolve(__dirname, filename)).default
  };
};
const unapplied = idx => ({index}) => index > idx;
function main() {
  return __awaiter(this, void 0, void 0, function*() {
    const files = yield fs.readdir(__dirname);
    const [lastMigration] = yield exports.prisma.query.migrations({
      where: {},
      orderBy: 'index_DESC',
      first: 1
    });
    files
      .filter(isMigration)
      .map(toMigration)
      .filter(lastMigration ? unapplied(lastMigration.index) : shades_1.always(true))
      .forEach(({index, name, code}) =>
        __awaiter(this, void 0, void 0, function*() {
          yield code();
          yield exports.prisma.mutation.createMigration({data: {index, name}});
          console.log(`Applied ${index}: ${name}`);
        })
      );
  });
}
main();
