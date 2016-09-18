#!/usr/bin/env node

/**
 * 1. find all first-level package.json files recursively
 *    (if current directory contains it, will not walk subdirectories)
 * 2. see which of those contains the wanted module as a dependency
 */
const walker = require('./walker');

/* eslint-disable no-console */
if (process.argv.length < 3) {
  console.log('Usage: find-using <module>');
  process.exit(1);
}

const needle = process.argv[2];
console.log(`Finding packages depending on ${needle}...`);

walker.findUsesInPath(process.cwd(), needle)
  .then(locations => locations.forEach(l => console.log(l)))
  .catch(err => console.log(err));
