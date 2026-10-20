import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// Resolve Vite's declared bundler dependency, including strict pnpm layouts.
const require = createRequire(import.meta.url);
const { build } = createRequire(require.resolve('vite'))('esbuild');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
await build({
  entryPoints: [resolve(root, 'src/features/firework-puppets/main.ts')],
  outfile: resolve(root, 'public/demos/firework-puppets/app.js'),
  bundle: true, format: 'iife', target: 'es2022', minify: true, legalComments: 'linked',
  logLevel: 'info',
});
