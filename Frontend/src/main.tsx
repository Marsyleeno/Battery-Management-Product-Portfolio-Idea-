import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// These two lines are the magic that will fix your fonts and layout!
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)