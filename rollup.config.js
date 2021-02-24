import {terser} from 'rollup-plugin-terser'; //ES minifier
import minifyHTML from 'rollup-plugin-minify-html-literals';
import alias from '@rollup/plugin-alias';
import cleanup from 'rollup-plugin-cleanup';
import license from 'rollup-plugin-license';
import {babel} from '@rollup/plugin-babel';

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
    minifyHTML(),
    terser(),
    cleanup({
      comments: ['none']
    }),
    // Add back the polymer license that was duplicated from the imports and our license
    license({
      banner: `
/**
 * @license
 * Copyright (c) 2021 ZingSoft Inc.
 * This code may only be used under the BSD style license found at
 * http://github.com/zingsoftinc/git-view/LICENSE.txt
 */ 
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
      `,
    }),
    babel({
      babelHelpers: 'bundled'
    })
  ]
}