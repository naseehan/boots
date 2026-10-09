const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    productGroup: {
      type: String,
      enum: ['shoes', 'sportsBalls', 'boardGames', 'racquets', 'other'],
      default: 'other',
    },
    overview: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: '' },
    imageKey: { type: String, default: null },
    hasSizes: { type: Boolean, default: false },
    sizes: { type: [String], default: [] },
    slug: { type: String, unique: true, trim: true },
  },
  {
    timestamps: true,
    collection: 'signature-products',
  }
);

/**
 * Pre-save hook: auto-generate a unique slug from the product name
 * if one has not already been provided.
 */
productSchema.pre('save', function (next) {
  if (!this.slug) {
    const base = this.name
      .toLowerCase()
      .replace(/\s+/g, '-')        // spaces → hyphens
      .replace(/[^a-z0-9-]/g, ''); // strip non-alphanumeric
    this.slug = `${base}-${uuidv4().slice(0, 8)}`;
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
