import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'framer-motion'; 
import 'embla-carousel'; 
import '@mantine/core/styles.css'; 
import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <App />
    </MantineProvider>
  </StrictMode>
  </BrowserRouter>
  ,
)
