/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_KAKAO_KEY: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
