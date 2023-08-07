import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import Components from 'unplugin-vue-components/vite'

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  base: '/which-one-is-special-vue3/',
  optimizeDeps: {
      esbuildOptions: {
        target: 'es2020'
      }
    },

    build: {
      target: 'es2020'
    },
    resolve: {
    alias: 
      {
        "@": path.resolve(__dirname, "./src"),
         //   find: /^aws-sdk$/,
         //     replacement: "aws-sdk/dist/aws-sdk.min.js",
        },
  },
    plugins: [
       // Components({
       // }),
        vue(),
  ],
    define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    'process.env': {},
    //global: {},
    '_vm._self._c': {},
  },
    
})