import { createRoot } from 'react-dom/client'
import './assets/style/main.scss'
import { App } from './root-cmp.jsx'

createRoot(document.getElementById('root')).render(
  <App />
)
