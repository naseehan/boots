import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';

// Used by scripts/prerender.js to render a route to static HTML at build time.
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <StrictMode>
        <App />
      </StrictMode>
    </StaticRouter>
  );
}
