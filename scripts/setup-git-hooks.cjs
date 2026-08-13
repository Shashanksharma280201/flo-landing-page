const { execFileSync } = require('node:child_process');

try {
  execFileSync('git', ['rev-parse', '--git-dir'], { stdio: 'ignore' });
  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], {
    stdio: 'inherit',
  });
} catch {
  console.warn('Skipping Git hooks setup because Git config could not be updated.');
}
