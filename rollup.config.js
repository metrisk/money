import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.mjs',
      format: 'es',
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'auto',
    }
  ],
  plugins: [
    nodeResolve({ extensions: ['.js','.ts'] }),
    typescript(),
  ],
}