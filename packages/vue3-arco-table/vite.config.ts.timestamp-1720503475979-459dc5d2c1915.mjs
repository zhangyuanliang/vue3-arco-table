// vite.config.ts
import { defineConfig } from "file:///Users/sailing/myProjects/GitHub/vue3-arco-table/node_modules/.pnpm/vite@5.3.3_@types+node@20.14.10_less@4.2.0/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/sailing/myProjects/GitHub/vue3-arco-table/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.3_@types+node@20.14.10_less@4.2.0__vue@3.4.31_typescript@5.5.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "node:path";
import vueTypeImports from "file:///Users/sailing/myProjects/GitHub/vue3-arco-table/node_modules/.pnpm/vite-plugin-vue-type-imports@0.2.5_vite@5.3.3_@types+node@20.14.10_less@4.2.0__vue@3.4.31_typescript@5.5.3_/node_modules/vite-plugin-vue-type-imports/dist/index.mjs";
import cssInjectedByJsPlugin from "file:///Users/sailing/myProjects/GitHub/vue3-arco-table/node_modules/.pnpm/vite-plugin-css-injected-by-js@3.5.1_vite@5.3.3_@types+node@20.14.10_less@4.2.0_/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
import dts from "file:///Users/sailing/myProjects/GitHub/vue3-arco-table/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.10_rollup@4.18.1_typescript@5.5.3_vite@5.3.3_@types+node@20.14.10_less@4.2.0_/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/sailing/myProjects/GitHub/vue3-arco-table/packages/vue3-arco-table";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueTypeImports(),
    cssInjectedByJsPlugin(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: false,
      cleanVueFileName: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./src/index.ts"),
      name: "vue3-arco-table",
      formats: ["es", "cjs"]
    },
    outDir: "dist",
    rollupOptions: {
      external: ["vue", "arco-design"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          "arco-design": "ArcoDesign"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc2FpbGluZy9teVByb2plY3RzL0dpdEh1Yi92dWUzLWFyY28tdGFibGUvcGFja2FnZXMvdnVlMy1hcmNvLXRhYmxlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc2FpbGluZy9teVByb2plY3RzL0dpdEh1Yi92dWUzLWFyY28tdGFibGUvcGFja2FnZXMvdnVlMy1hcmNvLXRhYmxlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zYWlsaW5nL215UHJvamVjdHMvR2l0SHViL3Z1ZTMtYXJjby10YWJsZS9wYWNrYWdlcy92dWUzLWFyY28tdGFibGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHZ1ZVR5cGVJbXBvcnRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS10eXBlLWltcG9ydHMnXG5pbXBvcnQgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qcydcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlVHlwZUltcG9ydHMoKSxcbiAgICBjc3NJbmplY3RlZEJ5SnNQbHVnaW4oKSxcbiAgICBkdHMoe1xuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICAgIGNvcHlEdHNGaWxlczogZmFsc2UsXG4gICAgICBjbGVhblZ1ZUZpbGVOYW1lOiB0cnVlLFxuICAgIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvaW5kZXgudHMnKSxcbiAgICAgIG5hbWU6ICd2dWUzLWFyY28tdGFibGUnLFxuICAgICAgZm9ybWF0czogWydlcycsICdjanMnXSxcbiAgICB9LFxuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbJ3Z1ZScsICdhcmNvLWRlc2lnbiddLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGV4cG9ydHM6ICduYW1lZCcsXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6ICdWdWUnLFxuICAgICAgICAgICdhcmNvLWRlc2lnbic6ICdBcmNvRGVzaWduJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZZLFNBQVMsb0JBQW9CO0FBQzFhLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTywyQkFBMkI7QUFDbEMsT0FBTyxTQUFTO0FBTGhCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLGVBQWU7QUFBQSxJQUNmLHNCQUFzQjtBQUFBLElBQ3RCLElBQUk7QUFBQSxNQUNGLGtCQUFrQjtBQUFBLE1BQ2xCLGNBQWM7QUFBQSxNQUNkLGtCQUFrQjtBQUFBLElBQ3BCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDMUMsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsT0FBTyxhQUFhO0FBQUEsTUFDL0IsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFVBQ1AsS0FBSztBQUFBLFVBQ0wsZUFBZTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
