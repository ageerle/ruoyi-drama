import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const require = createRequire(import.meta.url), { build } = createRequire(require.resolve('vite'))('esbuild');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
await build({ entryPoints: [resolve(root, 'src/features/military-array/main.ts')], outfile: resolve(root, 'public/demos/long-snake/app.js'), bundle: true, format: 'iife', target: 'es2022', minify: true, legalComments: 'linked', logLevel: 'info' });
