import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'global': {},
  },
  server:{
    host:false
  }
  
})
