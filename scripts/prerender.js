/**
 * prerender.js
 * Runs after `vite build` and the SSR build. Renders every public page to static HTML, with its own
 * title, description, canonical URL and structured data, so search engines and link previews see the
 * full page, and visitors see it before the JavaScript has downloaded. Also writes sitemap.xml.
 *
 *   dist/index.html, dist/products/index.html, dist/products/<slug>/index.html, ...
 *   dist/app.html    empty shell for every other route (admin, 404), see vercel.json
 *
 * Products come from the live API, so new products appear after the next deploy. If the API is
 * unreachable the build falls back to src/components/products.js.
 */
import fs from 'node:fs';
import path from 'node:path';
import { Worker } from 'node:worker_threads';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const entry = pathToFileURL(path.join(ssrDir, 'entry-server.js')).href;
const API_URL = (process.env.VITE_API_URL || 'https://signature-sports-api.onrender.com').replace(/\/+$/, '');

const { pageMeta, productMeta, renderHeadTags, SITE_URL } = await import(entry);

// Only the fields the pages use, to keep the embedded data small
const pick = (p) => ({
  _id: p._id,
  name: p.name,
  slug: p.slug,
  price: p.price,
  category: p.category,
  productGroup: p.productGroup,
  overview: p.overview,
  imageUrl: p.imageUrl,
  hasSizes: p.hasSizes,
  sizes: p.sizes,
  padding: p.padding,
  rating: p.rating,
  updatedAt: p.updatedAt,
});

async function loadProducts() {
  try {
    // Render's free tier can take ~a minute to wake up
    const res = await fetch(`${API_URL}/api/products`, { signal: AbortSignal.timeout(90_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('no products returned');
    console.log(`prerender: ${data.length} products from ${API_URL}`);
    return data.map(pick);
  } catch (err) {
    console.warn(`prerender: API unavailable (${err.message}), using src/components/products.js`);
    const { default: staticProducts } = await import(pathToFileURL(path.join(root, 'src/components/products.js')).href);
    return Object.entries(staticProducts).flatMap(([group, items]) =>
      items.map((it) =>
        pick({ ...it, _id: String(it.id), productGroup: group, overview: it.desc, imageUrl: it.image })
      )
    );
  }
}

// Each page renders in a fresh worker so styled-components numbers its class names the same way
// the browser does when that page is loaded directly.
const renderInWorker = (url, data) =>
  new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./render-worker.js', import.meta.url), { workerData: { entry, url, data } });
    worker.once('message', resolve);
    worker.once('error', reject);
    worker.once('exit', (code) => code !== 0 && reject(new Error(`prerender: rendering ${url} failed`)));
  });

async function mapLimit(items, limit, fn) {
  const results = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await fn(items[i]);
      }
    })
  );
  return results;
}

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>') || !/<!-- page-meta -->[\s\S]*<!-- \/page-meta -->/.test(template)) {
  throw new Error('prerender: dist/index.html is missing <div id="root"></div> or the page-meta block');
}

// Lazy-loaded pages: link their CSS (and preload their JS) from the HTML, otherwise the prerendered
// markup shows unstyled until the page's JS chunk has loaded and pulled in its CSS.
const manifestFile = path.join(dist, '.vite', 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
function chunkAssets(src) {
  const css = new Set();
  const js = new Set();
  const visit = (key, isEntry) => {
    const chunk = manifest[key];
    if (!chunk || (key !== src && chunk.isEntry)) return; // the main entry's assets are already in the template
    if (!isEntry && !template.includes(chunk.file)) js.add(chunk.file);
    chunk.css?.forEach((f) => template.includes(f) || css.add(f));
    chunk.imports?.forEach((k) => visit(k, false));
  };
  visit(src, false);
  return [
    ...[...js].map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`),
    ...[...css].map((f) => `<link rel="stylesheet" crossorigin href="/${f}">`),
  ].join('');
}

const products = await loadProducts();
const routes = [
  { url: '/', meta: pageMeta('/'), data: {} },
  { url: '/products', page: 'src/pages/Products.jsx', meta: pageMeta('/products'), data: { products } },
  { url: '/about', page: 'src/pages/About.jsx', meta: pageMeta('/about'), data: {} },
  { url: '/contact', page: 'src/pages/Contact.jsx', meta: pageMeta('/contact'), data: {} },
  ...products
    .filter((p) => /^[A-Za-z0-9-]+$/.test(p.slug || ''))
    .map((p) => ({
      url: `/products/${p.slug}`,
      page: 'src/pages/ProductDetails.jsx',
      meta: productMeta(p),
      data: { product: p },
      lastmod: p.updatedAt,
    })),
];

await mapLimit(routes, 4, async (route) => {
  const { html, styles } = await renderInWorker(route.url, route.data);
  const dataScript = Object.keys(route.data).length
    ? `<script>window.__PRERENDER_DATA__=${JSON.stringify(route.data).replace(/</g, '\\u003c')}</script>`
    : '';
  const pageAssets = route.page ? chunkAssets(route.page) : '';
  const page = template
    .replace(/<!-- page-meta -->[\s\S]*<!-- \/page-meta -->/, renderHeadTags(route.meta))
    .replace('</head>', `${pageAssets}${styles}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>${dataScript}`);

  const file = route.url === '/' ? path.join(dist, 'index.html') : path.join(dist, route.url, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
});

// The shell keeps the template's default title and description, without a canonical URL
fs.writeFileSync(path.join(dist, 'app.html'), template);

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.url === '/' ? '/' : r.url}</loc>
    <lastmod>${(r.lastmod || today).slice(0, 10)}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.rmSync(ssrDir, { recursive: true, force: true });
fs.rmSync(path.join(dist, '.vite'), { recursive: true, force: true });
console.log(`prerender: wrote ${routes.length} pages, app.html and sitemap.xml`);
