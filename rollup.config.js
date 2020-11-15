import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    name: 'comingTime',
    file: 'dist/index.js',
    format: 'umd',
  },
  plugins: [terser()],
};
