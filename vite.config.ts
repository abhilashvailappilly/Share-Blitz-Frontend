// import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [
    react(),
nodePolyfills({include:['crypto', 'buffer', 'stream', 'util']}),
viteCommonjs(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // 'global': {},
  },
  server:{
    host:false
  }
  
})
