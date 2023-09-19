import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import viteImagemin from 'vite-plugin-imagemin';
import { compression } from 'vite-plugin-compression2';
import circleDependency from 'vite-plugin-circular-dependency';

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { PluginPure } from 'rollup-plugin-pure'

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser",
      './runtimeConfig': './runtimeConfig.browser', // ensures browser compatible version of AWS JS SDK is used
    },
  },
  plugins: [
    // Components({
    // }),
    PluginPure({
      functions: ['defineComponent'],
      include: [/(?<!im)pure\.js$/],
      // exclude: [],
      // sourcemap: true,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    circleDependency({
        outputFilePath: './circleDep'
    }),
    polyfillNode(),
    NodeGlobalsPolyfillPlugin({
      buffer: true
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    compression(),
    vue(), 
   
  ],
    // added base to find the assets in the right place
    base:'/which-one-is-special-vue3/',
    define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
      // use this for local development
     // global: {},
      // use this for production build 
      'process.env': {},
      '_vm._self._c': {},
  },
    
})
