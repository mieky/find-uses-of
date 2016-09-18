const path = require('path');
const finder = require('../src/finder');

test('finds root-level occurrences of "needle"', () => {
  const testPath = path.resolve(process.cwd(), '__tests__');
  return finder.findUsesInPath(testPath, 'needle')
    .then((dirs) => {
      expect(dirs).toEqual([
        'test-dirs/dir1',
        'test-dirs/dir2/subdir2',
      ]);
    });
});
