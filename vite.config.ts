import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// export default defineConfig({
//   resolve:{
//     alias:{
//       "@": resolve(__dirname,'./src'),
//     }
//   },
//   build: {
//     target: 'modules',
//     outDir: 'dist',
//     minify: false,
//     rollupOptions: {
//       external: ['vue'],
//       input: ['./packages/table-basic/index.ts'],
//       output: [
//         {
//           format: 'es',
//           entryFileNames: '[name].js',
//           preserveModules: true,
//           dir: 'dist',
//           preserveModulesRoot: 'src',
//           globals: {
//             vue: 'Vue'
//           }
//         },
//       ],
//     },
//     lib: {
//       entry: './packages/table-basic/index.ts',
//     },
//   },
//   plugins: [vue()],
//   css: {
//     preprocessorOptions: {
//       less: {
//         javascriptEnabled: true,
//       },
//     },
//   },
// })

export default defineConfig({
  base: './',
  server: {
    host: true,
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/table-basic/index.ts'),
      name: 'vue3-arco-table',
      fileName: format => `vue3-arco-table.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'arco-design'],
      input: resolve(__dirname, 'packages/table-basic/index.ts'),
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'arco-design': 'ArcoDesign',
        },
      },
    },
  },
});
