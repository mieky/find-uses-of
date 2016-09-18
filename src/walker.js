const path = require('path');
const promise = require('bluebird');
const fs = promise.promisifyAll(require('fs'));
const has = require('lodash.has');

const findSubdirsWithPackageJson = promise.coroutine(function* findSubdirs(foundLocations, dir) {
  const locations = foundLocations || [];

  const files = yield fs.readdirAsync(dir);

  // package.json found in current directory, no need to look further
  if (files.includes('package.json')) {
    return locations.concat(dir);
  }

  // package.json wasn't found yet, search subdirectories recursively
  const dirs = yield promise
    .map(files, f => path.resolve(dir, f))
    .filter(filePath => fs.statAsync(filePath)
      .then(stat => stat.isDirectory())
    )
    .map(d => findSubdirsWithPackageJson(locations, d));

  // flatten a potential [[], [], ['dir']] mess into a neat array
  return locations.concat(...dirs);
});

function isNeedleInHaystack(haystackDir, needleName) {
  const pkgJsonPath = path.resolve(haystackDir, 'package.json');

  /* eslint-disable global-require */
  const pkgJson = require(pkgJsonPath);
  return has(pkgJson, `dependencies.${needleName}`) ||
    has(pkgJson, `devDependencies.${needleName}`);
  /* eslint-enable global-require */
}

module.exports = {
  findSubdirsWithPackageJson,
  isNeedleInHaystack,
};
