import esbuild from 'esbuild';

const isProd = process.argv.includes('--production');

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'main.js',
  format: 'cjs',
  target: 'es2022',
  external: ['resin-api', 'resin'],
  minify: isProd,
  sourcemap: !isProd ? 'inline' : false,
});