import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/styles/variables.css'
import './shared/styles/global.css'
import './index.css'
import App from './core/App.tsx'
import ErrorBoundary from './shared/components/ui/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
