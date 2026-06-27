import { CapacitorConfig } from "@capacitor/cli";

// IMPORTANT: replace this with your actual live Vercel URL.
const PRODUCTION_URL = "https://integralvalet.app";

const config: CapacitorConfig = {
  appId: "com.integralvalet.app",
  appName: "Integral Valet",
  webDir: "www",
  server: {
    // Loads your real, already-deployed app inside the native shell.
    // Login sessions, the database, sound alerts — everything works exactly
    // as it does in the browser, because it IS the same app.
    url: PRODUCTION_URL,
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
