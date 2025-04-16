/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // tambahkan variabel env lain di sini jika diperlukan
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
