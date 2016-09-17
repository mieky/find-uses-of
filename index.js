/* eslint-disable no-console */
const path = require('path');
const promise = require('bluebird');
const fs = promise.promisifyAll(require('fs'));

// 1. find all first-level package.json files recursively
//    (if current directory contains it, will not walk subdirectories)
// 2. see which of those contains the wanted module as a dependency

// package.json found in current directory?
// - yes: see if package.json contains the wanted module
// - no: walk subdirectories

const findLocationsWithPackageJson = promise.coroutine(function* find(foundLocations, dir) {
  const locations = foundLocations || [];

  const files = yield fs.readdirAsync(dir);

  // package.json found in current directory, no need to look further
  if (files.includes('package.json')) {
    return locations.concat(dir);
  }

  // search subdirectories recursively
  const dirs = yield promise
    .map(files, f => path.resolve(dir, f))
    .filter(filePath => fs.statAsync(filePath)
      .then(stat => stat.isDirectory())
      .catch((err) => {
        console.log(err);
        return false;
      })
    )
    .map(d => findLocationsWithPackageJson(locations, d));

  // flatten a potential [[], [], ['dir']] mess into a neat array
  return locations.concat(...dirs);
});

findLocationsWithPackageJson(null, process.cwd())
  .then(locations => console.log(locations))
  .catch(err => console.log(err));
