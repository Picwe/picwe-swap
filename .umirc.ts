import { defineConfig } from "umi";
import routes from "./src/routes/routes";
import path from 'node:path';

export default defineConfig({
  // routes: [
  //   { path: "/", component: "index" },
  //   { path: "/docs", component: "docs" },
  // ],
  routes,
  npmClient: 'npm',
  extraPostCSSPlugins: [
    require("postcss-px-to-viewport")({
      viewportWidth: 1920,
      mediaQuery: true
    })
  ],
  lessLoader: {
    modifyVars: {},
    javascriptEnabled: true,
  },
  proxy: {
    '/api': {
      'target': 'https://movefun.meme',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '/api' },
    },
  },
  jsMinifier: 'terser',
  title: 'PIPI',
  metas: [
    { "http-equiv": 'Cache-Control', content: 'no-store, no-cache, must-revalidate' },
    { "http-equiv": 'Pragma', content: 'no-cache' },
    { "http-equiv": 'Expires', content: '0' },
  ],
  base: '/picwe-swap/',
  publicPath: '/picwe-swap/',
  mfsu: false,
  chainWebpack: (config) => {
    config.resolve.fallback
      .set('crypto', require.resolve('crypto-browserify'))
      .set('stream', require.resolve('stream-browserify'))
      .set('buffer', require.resolve('buffer/'));
    
    return config;
  },
});
