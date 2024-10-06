/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TODO_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
