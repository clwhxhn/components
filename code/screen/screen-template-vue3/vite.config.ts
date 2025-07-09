import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { defineConfig, loadEnv } from 'vite'
import type { PluginOption } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import topLevelAwait from 'vite-plugin-top-level-await'
import pxtorem from 'postcss-pxtorem'

import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  const { VITE_PORT, VUE_APP_NAME, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = env
  const root = process.cwd()
  const isBuild = command === 'build'
  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: VUE_APP_NAME
      }
    }
  })
  return {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
    },
    // vite 配置
    base: VITE_PUBLIC_PATH,
    root,
    server: {
      port: VITE_PORT,
      host: '0.0.0.0',
      proxy: {
        '/ai': {
          target: 'http://10.6.181.221:7853',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ai/, '')
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      htmlPlugin,
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: '__tla',
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: i => `__tla_${i}`
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url))
      }
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: 'dist',
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      assetsInlineLimit: 0
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 16, // 基准大小
            propList: ['*'],
            unitPrecision: 3, // 保留rem小数点多少位
            selectorBlackList: ['a-input', 'a-step', 'no-'], // 则是一个对css选择器进行过滤的数组，比如你设置为['a-']，那所有a-类名里面有关px的样式将不被转换，这里也支持正则写法。
            replace: true,
            mediaQuery: false, // 媒体查询( @media screen 之类的)中不生效
            minPixelValue: 2 // px小于2的不会被转换
          }),
          tailwindcss()
        ]
      }
    }
  }
})
