import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: './src/delivery_guy.js',
  output: {
    file: './dist/main.js',
    format: 'cjs'
  },
  plugins: [
    uglify(),
    babel({
      babelrc: false,
      plugins: ['fast-async', 'external-helpers', 'transform-class-properties'],
      presets: [
        'flow',
        [
          'env',
          {
            modules: false
          }
        ]
      ]
    })
  ]
}
