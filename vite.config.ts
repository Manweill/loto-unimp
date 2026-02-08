import { fileURLToPath, URL } from 'node:url'

import Uni from '@uni-helper/plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { UniUIResolver, ZPagingResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniPlatform from '@uni-helper/vite-plugin-uni-platform'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    // https://uni-helper.js.org/vite-plugin-uni-pages
    UniPages(),
    // https://uni-helper.js.org/vite-plugin-uni-components
    Components({
      dts: true,
      resolvers: [ZPagingResolver(), UniUIResolver()],
    }),
    // https://uni-helper.js.org/vite-plugin-uni-layouts
    UniLayouts(),
    // https://uni-helper.js.org/vite-plugin-uni-manifest
    UniManifest(),
    // https://uni-helper.js.org/vite-plugin-uni-platform
    UniPlatform(),
    // https://uni-helper.js.org/plugin-uni
    Uni(),
    UnoCSS(),
  ],
  build: {
    target: 'es6',
    cssTarget: 'chrome61',
  },
  optimizeDeps: {
    exclude: [
      'vue-demi',
    ],
  },
})
