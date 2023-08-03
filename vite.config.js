import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import Components from 'unplugin-vue-components/vite'

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
    alias: {
            "@": path.resolve(__dirname, "./src"),
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
    global: {},
  },
    
})