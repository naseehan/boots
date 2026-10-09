const express = require('express');
const Product = require('../models/Product');
const { getPresignedImageUrl } = require('../middleware/uploadMiddleware');

const router = express.Router();

/**
 * Helper to dynamically attach fresh presigned URLs for products with S3 imageKey.
 */
async function attachPresignedUrl(product) {
  if (!product) return product;
  if (product.imageKey) {
    try {
      const presigned = await getPresignedImageUrl(product.imageKey);
      if (presigned) {
        return { ...product, imageUrl: presigned };
      }
    } catch (_) {
      // Fallback to stored imageUrl
    }
  }
  return product;
}

// ─── GET /image/:key(*) — secure image redirect ──────────────────────────────
router.get('/image/:key(*)', async (req, res) => {
  try {
    const key = req.params.key;
    if (!key) return res.status(400).send('Image key required');
    const presigned = await getPresignedImageUrl(key);
    if (!presigned) return res.status(404).send('Image not found or storage not configured');
    res.redirect(302, presigned);
  } catch (err) {
    console.error('Image redirect error:', err);
    res.status(500).send('Failed to retrieve image');
  }
});

// ─── GET / — list products ────────────────────────────────────────────────────
// Query params:
//   group    → filter by productGroup
//   category → filter by category
//   sort     → 'price_asc' | 'price_desc'
router.get('/', async (req, res) => {
  try {
    const { group, category, sort } = req.query;
    const filter = {};

    if (group) filter.productGroup = group;
    if (category) filter.category = category;

    const sortMap = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
    };
    const sortOrder = sortMap[sort] || { createdAt: -1 };

    const products = await Product.find(filter).sort(sortOrder).lean();
    const withSignedUrls = await Promise.all(products.map(attachPresignedUrl));
    res.json(withSignedUrls);
  } catch (err) {
    console.error('GET /products error:', err);
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

// ─── GET /slug/:slug ──────────────────────────────────────────────────────────
router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).lean();
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    const withSignedUrl = await attachPresignedUrl(product);
    res.json(withSignedUrl);
  } catch (err) {
    console.error('GET /products/slug/:slug error:', err);
    res.status(500).json({ error: 'Failed to fetch product.' });
  }
});

// ─── GET /:id ─────────────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    const withSignedUrl = await attachPresignedUrl(product);
    res.json(withSignedUrl);
  } catch (err) {
    // Handle invalid ObjectId format
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID.' });
    }
    console.error('GET /products/:id error:', err);
    res.status(500).json({ error: 'Failed to fetch product.' });
  }
});


module.exports = router;
