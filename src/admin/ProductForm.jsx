import { useState, useEffect, useRef } from 'react';
import { adminCreateProduct, adminUpdateProduct } from '../api/productsApi';
import './admin.css';

const CATEGORY_OPTIONS = [
  { value: 'football-shoes', label: 'Footwear (Football)', category: 'football', group: 'shoes' },
  { value: 'basketball-shoes', label: 'Footwear (Basketball)', category: 'basketball', group: 'shoes' },
  { value: 'tennis-shoes', label: 'Footwear (Tennis)', category: 'tennis', group: 'shoes' },
  { value: 'shuttle-shoes', label: 'Footwear (Badminton / Shuttle)', category: 'shuttle', group: 'shoes' },
  { value: 'running-shoes', label: 'Footwear (Running / Cricket)', category: 'running', group: 'shoes' },
  { value: 'football-ball', label: 'Sports Balls (Football)', category: 'football', group: 'sportsBalls' },
  { value: 'basketball-ball', label: 'Sports Balls (Basketball)', category: 'basketball', group: 'sportsBalls' },
  { value: 'racquets', label: 'Racquets', category: 'racquets', group: 'racquets' },
  { value: 'boardgames', label: 'Board Games', category: 'boardgames', group: 'boardGames' },
];

const getCategoryOptionValue = (category, group) => {
  const match = CATEGORY_OPTIONS.find(
    (opt) => opt.category === category && (group ? opt.group === group : true)
  );
  return match ? match.value : (CATEGORY_OPTIONS.find((opt) => opt.category === category)?.value || 'football-shoes');
};

const INITIAL_STATE = {
  name: '',
  price: '',
  categoryOption: 'football-shoes',
  overview: '',
  hasSizes: false,
  sizes: [],
};

/**
 * ProductForm — add or edit a product.
 *
 * Props:
 *   product   {object|null} — null = create mode, object = edit mode
 *   onSuccess {function}   — called with saved product on success
 *   onCancel  {function}   — called when user closes/cancels
 */
function ProductForm({ product, onSuccess, onCancel }) {
  const isEdit = Boolean(product);
  const fileRef = useRef(null);

  const [form, setForm] = useState(INITIAL_STATE);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [newSize, setNewSize] = useState('');
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        price: product.price != null ? String(product.price) : '',
        categoryOption: getCategoryOptionValue(product.category, product.productGroup),
        overview: product.overview || '',
        hasSizes: Boolean(product.hasSizes),
        sizes: Array.isArray(product.sizes)
          ? product.sizes
              .flatMap((s) => (typeof s === "string" ? s.replace(/[\[\]"'\\]/g, "").split(",") : s))
              .map((s) => String(s).trim())
              .filter(Boolean)
          : [],
      });
      setImagePreview(product.imageUrl || '');
    } else {
      setForm(INITIAL_STATE);
      setImagePreview('');
      setImageFile(null);
    }
    setErrors({});
    setSubmitError('');
  }, [product]);

  const handleField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: '' }));
  };

  const addSize = () => {
    const trimmed = newSize.trim();
    if (!trimmed) return;
    if (form.sizes.includes(trimmed)) {
      setNewSize('');
      return;
    }
    setForm((prev) => ({ ...prev, sizes: [...prev.sizes, trimmed] }));
    setNewSize('');
    setErrors((prev) => ({ ...prev, sizes: '' }));
  };

  const removeSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== size),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Product name is required.';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0)
      newErrors.price = 'Enter a valid price (≥ 0).';
    if (!form.overview.trim()) newErrors.overview = 'Product overview is required.';
    if (!isEdit && !imageFile) newErrors.image = 'Please select a product image.';
    if (form.hasSizes && form.sizes.length === 0)
      newErrors.sizes = 'Add at least one size when "Has Sizes" is checked.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const selectedCat = CATEGORY_OPTIONS.find((o) => o.value === form.categoryOption) || CATEGORY_OPTIONS[0];
      const formData = new FormData();
      formData.append('name', form.name.trim());
      formData.append('price', String(Number(form.price)));
      formData.append('category', selectedCat.category);
      formData.append('productGroup', selectedCat.group);
      formData.append('overview', form.overview.trim());
      formData.append('hasSizes', form.hasSizes ? 'true' : 'false');
      formData.append('sizes', JSON.stringify(form.hasSizes ? form.sizes : []));
      if (imageFile) formData.append('image', imageFile);

      let saved;
      if (isEdit) {
        saved = await adminUpdateProduct(product._id, formData);
      } else {
        saved = await adminCreateProduct(formData);
      }
      onSuccess(saved);
    } catch (err) {
      setSubmitError(err.message || 'Failed to save product. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit} noValidate>
      {submitError && (
        <div className="admin-alert admin-alert-error" role="alert">
          <span>⚠️</span>
          <span>{submitError}</span>
        </div>
      )}

      {/* Name */}
      <div className="admin-form-group">
        <label htmlFor="pf-name">Product Name *</label>
        <input
          id="pf-name"
          type="text"
          className={`admin-input ${errors.name ? 'is-error' : ''}`}
          value={form.name}
          onChange={(e) => handleField('name', e.target.value)}
          disabled={loading}
          placeholder="e.g. Nike Mercurial Superfly"
        />
        {errors.name && <span className="admin-field-error">{errors.name}</span>}
      </div>

      {/* Price + Category */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label htmlFor="pf-price">Price (₹) *</label>
          <input
            id="pf-price"
            type="number"
            min="0"
            step="0.01"
            className={`admin-input ${errors.price ? 'is-error' : ''}`}
            value={form.price}
            onChange={(e) => handleField('price', e.target.value)}
            disabled={loading}
            placeholder="1999"
          />
          {errors.price && <span className="admin-field-error">{errors.price}</span>}
        </div>

        <div className="admin-form-group">
          <label htmlFor="pf-category">Category *</label>
          <select
            id="pf-category"
            className="admin-select"
            value={form.categoryOption}
            onChange={(e) => handleField('categoryOption', e.target.value)}
            disabled={loading}
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview */}
      <div className="admin-form-group">
        <label htmlFor="pf-overview">Product Overview *</label>
        <textarea
          id="pf-overview"
          rows={4}
          className={`admin-textarea ${errors.overview ? 'is-error' : ''}`}
          value={form.overview}
          onChange={(e) => handleField('overview', e.target.value)}
          disabled={loading}
          placeholder="High-performance shoes designed for…"
        />
        {errors.overview && <span className="admin-field-error">{errors.overview}</span>}
      </div>

      {/* Image */}
      <div className="admin-form-group">
        <label htmlFor="pf-image">
          Product Image {!isEdit ? '*' : '(leave blank to keep current)'}
        </label>
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="admin-img-preview"
          />
        ) : (
          <div className="admin-img-placeholder">No image selected</div>
        )}
        <input
          id="pf-image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          ref={fileRef}
          onChange={handleFileChange}
          disabled={loading}
          style={{ marginTop: '0.4rem' }}
        />
        {errors.image && <span className="admin-field-error">{errors.image}</span>}
      </div>

      {/* Has Sizes */}
      <div className="admin-form-group">
        <label className="admin-checkbox-label">
          <input
            type="checkbox"
            checked={form.hasSizes}
            onChange={(e) => handleField('hasSizes', e.target.checked)}
            disabled={loading}
          />
          This product has sizes
        </label>
      </div>

      {form.hasSizes && (
        <div className="admin-form-group">
          <label>Sizes</label>
          {form.sizes.length > 0 && (
            <div className="sizes-container">
              {form.sizes.map((s) => (
                <span key={s} className="size-chip">
                  {s}
                  <button
                    type="button"
                    className="size-chip-remove"
                    onClick={() => removeSize(s)}
                    disabled={loading}
                    aria-label={`Remove size ${s}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="size-add-row">
            <input
              type="text"
              className="admin-input"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); addSize(); }
              }}
              placeholder="e.g. UK 9"
              disabled={loading}
            />
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={addSize}
              disabled={loading || !newSize.trim()}
            >
              Add
            </button>
          </div>
          {errors.sizes && <span className="admin-field-error">{errors.sizes}</span>}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <button
          type="button"
          className="admin-btn admin-btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="admin-btn admin-btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="admin-btn-spinner" />
              {isEdit ? 'Saving…' : 'Creating…'}
            </>
          ) : (
            isEdit ? 'Save Changes' : 'Create Product'
          )}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
