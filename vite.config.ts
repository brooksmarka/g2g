// https://vitejs.dev/config/

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { sentryVitePlugin } from "@sentry/vite-plugin";

// Load environment variables based on the current mode (development, production, etc.)
export default defineConfig(({ mode }) => {
  // Load environment variables from the .env file
  const env = loadEnv(mode, process.cwd());

  // Extract the Sentry auth token from the environment variables
  const sentryToken = env.VITE_SENTRY_AUTH_TOKEN;

  if (typeof sentryToken === "undefined") {
    throw new Error("Sentry token needed");
  }

  return {
    plugins: [
      react(),
      sentryVitePlugin({
        org: "mark-brooks",
        project: "g2g",
        authToken: sentryToken,
      })
    ],
    build: {
      sourcemap: true,
    },
  };
});
