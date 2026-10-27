import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';

// Bootstrap ships ~230 KB of CSS and the site uses a small part of it. Trim it to the selectors that
// appear in our source so less render-blocking CSS is downloaded. Our own stylesheets are left alone.
const purge = purgeCSSPlugin({ content: ['./index.html', './src/**/*.{js,jsx}'] });

export default {
  plugins: [
    {
      postcssPlugin: 'purge-bootstrap',
      OnceExit(root, helpers) {
        const file = (root.source?.input.file || '').replace(/\\/g, '/');
        if (file.includes('node_modules/bootstrap/')) return purge.OnceExit(root, helpers);
      },
    },
  ],
};
