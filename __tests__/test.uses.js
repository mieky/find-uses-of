const path = require('path');
const walker = require('../src/walker');

test('finds root-level occurrences of "needle"', () => {
  const testPath = path.resolve(process.cwd(), '__tests__');
  return walker.findUsesInPath(testPath, 'needle')
    .then((dirs) => {
      expect(dirs).toEqual([
        'test-dirs/dir1',
        'test-dirs/dir2/subdir2',
      ]);
    });
});
