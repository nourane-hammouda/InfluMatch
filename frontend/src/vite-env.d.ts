/// <reference types="vite/client" />

declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly MODE: string;
  }
}
