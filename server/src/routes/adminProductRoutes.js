const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const { requireAuth } = require('../middleware/authMiddleware');
const { uploadSingle, deleteS3Object, getPresignedImageUrl } = require('../middleware/uploadMiddleware');

const router = express.Router();

// All routes in this file require authentication
router.use(requireAuth);

// ─── VALIDATION RULES ─────────────────────────────────────────────────────────
const productValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required.'),
  body('price')
    .notEmpty().withMessage('Price is required.')
    .isFloat({ min: 0 }).withMessage('Price must be a non-negative number.'),
  body('category').trim().notEmpty().withMessage('Category is required.'),
  body('overview').trim().notEmpty().withMessage('Overview is required.'),
];

// ─── SIZES PARSER HELPER ──────────────────────────────────────────────────────
function parseSizes(sizes) {
  if (!sizes) return [];
  if (Array.isArray(sizes)) {
    return sizes
      .map((s) => String(s).replace(/^["'[\]\\]+|["'[\]\\]+$/g, '').trim())
      .filter(Boolean);
  }
  if (typeof sizes === 'string') {
    const trimmed = sizes.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .map((s) => String(s).replace(/^["'[\]\\]+|["'[\]\\]+$/g, '').trim())
          .filter(Boolean);
      }
    } catch (_) {
      // Not JSON string, fallback to comma split
    }
    return trimmed
      .split(',')
      .map((s) => s.replace(/^["'[\]\\]+|["'[\]\\]+$/g, '').trim())
      .filter(Boolean);
  }
  return [];
}

// ─── POST / — create product ──────────────────────────────────────────────────
router.post('/', uploadSingle, productValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, price, category, productGroup, overview, hasSizes, sizes, slug } = req.body;

    // Validate sizes when hasSizes is requested
    const hasSizesBool = hasSizes === 'true' || hasSizes === true;
    const sizesArr = hasSizesBool ? parseSizes(sizes) : [];

    if (hasSizesBool && sizesArr.length === 0) {
      return res.status(400).json({ error: 'Sizes array must not be empty when hasSizes is true.' });
    }

    const productData = {
      name,
      price: parseFloat(price),
      category,
      productGroup: productGroup || 'other',
      overview,
      hasSizes: hasSizesBool,
      sizes: sizesArr,
    };

    if (slug) productData.slug = slug;

    // Attach S3 image info if a file was uploaded
    if (req.file) {
      productData.imageKey = req.file.key;
      const presigned = await getPresignedImageUrl(req.file.key);
      productData.imageUrl = presigned || `/api/products/image/${encodeURIComponent(req.file.key)}`;
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error('POST /admin/products error:', err);
    if (err.code === 11000) {
      return res.status(409).json({ error: 'A product with that slug already exists.' });
    }
    res.status(500).json({ error: 'Failed to create product.' });
  }
});

// ─── PUT /:id — update product ────────────────────────────────────────────────
router.put('/:id', uploadSingle, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });

    const { name, price, category, productGroup, overview, hasSizes, sizes, slug } = req.body;

    // Apply field updates only when they are present in the request
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = parseFloat(price);
    if (category !== undefined) product.category = category;
    if (productGroup !== undefined) product.productGroup = productGroup;
    if (overview !== undefined) product.overview = overview;
    if (slug !== undefined) product.slug = slug;

    if (hasSizes !== undefined) {
      const hasSizesBool = hasSizes === 'true' || hasSizes === true;
      product.hasSizes = hasSizesBool;
      const sizesArr = hasSizesBool ? parseSizes(sizes) : [];

      if (hasSizesBool && sizesArr.length === 0) {
        return res.status(400).json({ error: 'Sizes array must not be empty when hasSizes is true.' });
      }
      product.sizes = sizesArr;
    }

    // Handle new image upload
    const oldImageKey = product.imageKey;
    if (req.file) {
      product.imageKey = req.file.key;
      const presigned = await getPresignedImageUrl(req.file.key);
      product.imageUrl = presigned || `/api/products/image/${encodeURIComponent(req.file.key)}`;
    }

    await product.save();

    // Delete old S3 object AFTER successful save
    if (req.file && oldImageKey) {
      try {
        await deleteS3Object(oldImageKey);
      } catch (s3Err) {
        // Non-fatal: log the error but don't fail the request
        console.error('Failed to delete old S3 object:', oldImageKey, s3Err.message);
      }
    }

    res.json(product);
  } catch (err) {
    console.error('PUT /admin/products/:id error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID.' });
    }
    if (err.code === 11000) {
      return res.status(409).json({ error: 'A product with that slug already exists.' });
    }
    res.status(500).json({ error: 'Failed to update product.' });
  }
});

// ─── DELETE /:id — delete product ─────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });

    const { imageKey } = product;

    await product.deleteOne();

    // Delete from S3 if image exists
    if (imageKey) {
      try {
        await deleteS3Object(imageKey);
      } catch (s3Err) {
        console.error('Failed to delete S3 object during product delete:', imageKey, s3Err.message);
      }
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('DELETE /admin/products/:id error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID.' });
    }
    res.status(500).json({ error: 'Failed to delete product.' });
  }
});

module.exports = router;
