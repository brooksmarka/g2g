import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const sentryToken = env.VITE_SENTRY_AUTH_TOKEN

  if (typeof sentryToken === 'undefined') {
    throw new Error('Sentry token needed')
  }

  return {
    plugins: [
      react(),
      sentryVitePlugin({
        org: 'mark-brooks',
        project: 'g2g',
        authToken: sentryToken,
      }),
      commonjs({
        include: /node_modules/,
        exclude: [
          'node_modules/fsevents/**',
          'node_modules/chokidar/**'
        ],
      }),
      nodeResolve({
        preferBuiltins: true,
        browser: true,
      }),
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        external: ['fsevents'],
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react';
              if (id.includes('@mui')) return 'mui';
              if (id.includes('aws-amplify')) return 'aws';
              if (id.includes('mapbox-gl')) return 'mapbox';
              if (id.includes('@sentry')) return 'sentry';
            }
          },
        },
      },
      chunkSizeWarningLimit: 500, 
    },
  }
})
