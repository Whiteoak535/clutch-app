import React from 'react'
import ReactDOM from 'react-dom/client'
import ClutchApp from './ClutchApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClutchApp />
  </React.StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/clutch-app/sw.js').catch(() => {})
  })
}
