import typescript from '@rollup/plugin-typescript'
import { resolve } from 'path'
import { typescriptPaths } from 'rollup-plugin-typescript-paths'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: {
        'runtyped': resolve(__dirname, 'src/runtyped'),
        'types': resolve(__dirname, 'src/types'),
      },
      name: 'runtyped',
    },
    rollupOptions: {
      external: [],
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: 'dist',
        }),
      ],
    }
  },
})
