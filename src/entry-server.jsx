import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Writable } from 'node:stream';
import { ServerStyleSheet } from 'styled-components';
import App from './App.jsx';
import { PrerenderDataContext } from './prerenderData';

export { pageMeta, productMeta, renderHeadTags, NOT_FOUND, SITE_URL } from './seo';

// Used by scripts/prerender.js to render a route to static HTML at build time.
// Waits for lazy-loaded pages, and collects the CSS of styled-components pages.
export function render(url, data = {}) {
  const sheet = new ServerStyleSheet();
  const app = sheet.collectStyles(
    <PrerenderDataContext.Provider value={data}>
      <StaticRouter location={url}>
        <StrictMode>
          <App />
        </StrictMode>
      </StaticRouter>
    </PrerenderDataContext.Provider>
  );

  return new Promise((resolve, reject) => {
    let html = '';
    const output = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk;
        callback();
      },
    });
    output.on('finish', () => {
      resolve({ html, styles: sheet.getStyleTags() });
      sheet.seal();
    });

    const { pipe } = renderToPipeableStream(app, {
      onAllReady: () => pipe(output),
      onShellError: reject,
      onError: reject,
    });
  });
}
