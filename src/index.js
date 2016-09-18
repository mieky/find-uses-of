#!/usr/bin/env node

/**
 * 1. Find all first-level package.json files recursively.
 *    If current directory contains it, subdirectories will not be checked.
 * 2. List all those containing the wanted module as a dependency.
 */
const finder = require('./finder');
const promise = require('bluebird');
const fs = promise.promisifyAll(require('fs'));
const path = require('path');

/* eslint-disable no-console */

function warnIfModuleRoot(runDir) {
  const filePath = path.resolve(runDir, 'package.json');
  return fs.statAsync(filePath)
    .then((stat) => {
      if (stat && stat.isFile()) {
        console.warn('Warning: current directory contains package.json, so subdirectories will not be searched.');
      }
      return stat;
    })
    // Stat will throw an exception if no package.json exists in current directory
    .catch(err => err);
}

// Only attempt to parse argv if called directly from command line
if (require.main === module) {
  if (process.argv.length < 3) {
    console.log('Usage: find-using <module>');
    process.exit(1);
  }

  const needle = process.argv[2];
  console.log(`Finding packages depending on ${needle}...`);

  const runDir = process.cwd();

  warnIfModuleRoot(runDir)
    .then(() => finder.findUsesInPath(runDir, needle))
    .then(locations => locations.forEach((l) => {
      if (l === '') {
        console.log('(current directory matches)');
      } else {
        console.log(l);
      }
    }))
    .catch(err => console.log(err));
}

// Allow requiring as a module
module.exports = finder;
