import {terser} from 'rollup-plugin-terser'; //ES minifier

import alias from '@rollup/plugin-alias';

export default {
  input: './src/GitView.js',
  output: {
      file: './dist/git-view.min.js',
      format: 'es',
      name: 'main',
      compact: true,
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