import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

// Ensure you have the necessary dependencies installed
// npm install @vitejs/plugin-react vite-plugin-node-polyfills @originjs/vite-plugin-commonjs path-browserify stream-browserify crypto-browserify buffer os-browserify url assert

export default defineConfig({
  plugins: [
    react(),
    // nodePolyfills({
    //   include: ['crypto', 'buffer', 'stream', 'util', 'path', 'url', 'os', 'assert'],
    // }),
    // viteCommonjs(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // path: 'path-browserify',
      // stream: 'stream-browserify',
      // util: 'util',
      // crypto: 'crypto-browserify',
      // buffer: 'buffer',
      // os: 'os-browserify/browser',
      // url: 'url',
      // assert: 'assert',
    },
  },
  define: {
    // global: 'window', // Ensure global is defined
    // process: {
    //   env: {}
    // }
  },
  server: {
    host: true, // To expose your local development server to the network
  },
});
