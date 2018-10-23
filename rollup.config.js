import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: './src/delivery_guy.js',
  output: {
    file: './dist/main.js',
    format: 'cjs'
  },
  plugins: [
    uglify(),
    resolve(),
    babel({
      babelrc: false,
      plugins: ['module:fast-async', '@babel/plugin-proposal-class-properties'],
      presets: [
        '@babel/preset-flow',
        [
          '@babel/preset-env',
          {
            modules: false
          }
        ]
      ]
    })
  ]
}
