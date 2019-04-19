import typescript from 'rollup-plugin-typescript'
import { uglify } from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: './src/delivery_guy.ts',
  output: {
    file: './dist/main.js',
    format: 'cjs'
  },
  plugins: [
    uglify(),
    resolve(),
    typescript()
  ]
}
