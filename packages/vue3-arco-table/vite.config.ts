import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import vueTypeImports from 'vite-plugin-vue-type-imports'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    vueTypeImports(),
    cssInjectedByJsPlugin(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: false,
      cleanVueFileName: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'vue3-arco-table',
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['vue', 'arco-design'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'arco-design': 'ArcoDesign',
        },
      },
    },
  },
})
