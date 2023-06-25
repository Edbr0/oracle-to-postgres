import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['vue', 'echarts'],
  },
  plugins: [
    Vue({
      include: [/\.vue$/],
      reactivityTransform: true,
      customElement: ['iconify-icon'],
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Unocss(),
  ],
  resolve: {
    alias: {
      'iconify-icon': resolve(__dirname, 'node_modules/iconify-icon/dist/iconify-icon.mjs'),
    },
  },
  server: {
    port: 8082,
  },
})
