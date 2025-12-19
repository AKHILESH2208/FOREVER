import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import { MovieProvider } from './Context/MovieContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <MovieProvider>
    <App />
    </MovieProvider>
    </BrowserRouter>
  </StrictMode>,
)
