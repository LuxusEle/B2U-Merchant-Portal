/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QR_APP_BASE_URL: string;    // e.g. https://qr.b2u.app or http://localhost:9002
  readonly VITE_PIN_ENDPOINT?: string;      // optional override: defaults to `${VITE_QR_APP_BASE_URL}/api/auth/signin-pin`
  readonly VITE_SESSION_ENDPOINT?: string;  // optional override: defaults to `${VITE_QR_APP_BASE_URL}/api/session/create`
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}