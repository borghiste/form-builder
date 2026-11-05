/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TEST: string;
  readonly VITE_BACKEND_URL: string;

  // aggiungi qui altre variabili d'ambiente se vuoi
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
