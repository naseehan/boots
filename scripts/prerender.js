/**
 * prerender.js
 * Runs after `vite build` and the SSR build. Renders the home page to static HTML so mobile
 * visitors see it before the JavaScript has downloaded.
 *
 *   dist/index.html  home page with prerendered markup (served for "/")
 *   dist/app.html    empty shell, served for every other route (see vercel.json)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const html = render('/');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
}

fs.writeFileSync(path.join(dist, 'app.html'), template);
fs.writeFileSync(path.join(dist, 'index.html'), template.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
fs.rmSync(ssrDir, { recursive: true, force: true });

console.log(`prerender: wrote dist/index.html (${(html.length / 1024).toFixed(1)} KB of markup) and dist/app.html`);
