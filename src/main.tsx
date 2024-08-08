import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as Sentry from '@sentry/react'

import { Amplify } from 'aws-amplify'
import amplifyconfig from './amplifyconfiguration.json'

Amplify.configure(amplifyconfig)

Sentry.init({
  dsn: 'https://57083b21ff3e43e418bc42cd59c5ff9a@o4507505630969856.ingest.us.sentry.io/4507505634181120',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', 'https://www.mudorhero.org'],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
