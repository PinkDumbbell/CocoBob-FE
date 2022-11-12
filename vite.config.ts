/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { createHtmlPlugin } from 'vite-plugin-html';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      svgr({
        include: '**/*.svg',
      }),
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            KAKAO_KEY: env.VITE_KAKAO_KEY,
          },
        },
      }),
      splitVendorChunkPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VITE_KAKAO_KEY': JSON.stringify(process.env.VITE_KAKAO_KEY),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': [
              'react',
              'react-dom',
              'react-router-dom',
              'react-helmet',
              'react-hook-form',
              'react-transition-group',
            ],
            'redux-vendor': ['@reduxjs/toolkit', 'redux-logger', 'redux-persist', 'react-redux'],
            'network-vendor': ['axios', 'async-mutex'],
            'ui-vendor': [
              '@mui/material',
              '@mui/styled-engine-sc',
              'react-icons',
              'styled-components',
              'styled-reset',
              'swiper',
            ],
            'util-vendor': [
              'dayjs',
              'lodash',
              'uuid',
              'react-kakao-maps-sdk',
              'react-datepicker',
              'react-calendar',
              'react-intersection-observer',
            ],
          },
        },
      },
    },
  };
});
