import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

const input = 'src/useGeoLocation.ts';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const plugins = [
  typescript({
    typescript: require('typescript'),
  }),
  babel({ extensions, include: ['src/**/*'], exclude: ['node_modules/**'] }),
];

export default [
  {
    input: './src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
  {
    input,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        globals: {
          react: 'React',
        },
        plugins: [terser()],
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
        globals: {
          react: 'React',
        },
      },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins,
  },
];
