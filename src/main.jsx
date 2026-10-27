import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { PrerenderDataContext } from './prerenderData';

const app = (
  <PrerenderDataContext.Provider value={window.__PRERENDER_DATA__ || {}}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </PrerenderDataContext.Provider>
);

// Load the web fonts after the first paint so they don't compete with the page's CSS and hero image.
// Text shows in the fallback font until they arrive (font-display: swap), as it did with Google Fonts.
import('./fonts.css');

// Public pages are prerendered at build time (see scripts/prerender.js); other routes start empty.
const root = document.getElementById('root');
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
