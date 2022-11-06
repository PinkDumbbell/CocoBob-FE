/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, loadEnv } from 'vite';
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
  };
});
