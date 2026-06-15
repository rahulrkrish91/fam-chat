import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const tscBin = process.platform === 'win32'
  ? join('node_modules', '.bin', 'tsc.cmd')
  : join('node_modules', '.bin', 'tsc');

if (!existsSync(tscBin)) {
  console.error('TypeScript is not installed locally. Run `npm install` before `npm run typecheck`.');
  process.exit(1);
}

const result = spawnSync(tscBin, ['--noEmit'], { stdio: 'inherit', shell: process.platform === 'win32' });
process.exit(result.status ?? 1);
