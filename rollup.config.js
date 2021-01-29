import {terser} from 'rollup-plugin-terser'; //ES minifier

import alias from '@rollup/plugin-alias';

export default {
  input: './src/main.js',
  output: {
      file: './dist/git-view.min.js',
      format: 'iife',
      name: 'main',
      compact: false,
      minifyInternalExports: true,
  },
  plugins: [
    alias({
      entries: [
        {
          find: '/node_modules', replacement: './node_modules',
        }
      ]
    }),
    terser()
  ]
}