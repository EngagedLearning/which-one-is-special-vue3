import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
//import legacy from 'rollup-plugin-node-polyfills';

//import Components from 'unplugin-vue-components/vite'

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
      vue(),
      polyfillNode(),
      NodeGlobalsPolyfillPlugin({
                    buffer: true
                }),
  /*    nodePolyfills({
        globals: {
          Buffer: true,
          global: true,
          process:true,
        },
        protocolImports:true
      }),*/
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
    // global: {},
      '_vm._self._c': {},
  },
    
})