import { useState, useEffect, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import ProductForm from './ProductForm';
import ConfirmDialog from './ConfirmDialog';
import { fetchProducts, adminDeleteProduct } from '../api/productsApi';
import './admin.css';

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [search, setSearch] = useState('');

  // Panel state
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = create mode

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Success toast
  const [successMsg, setSuccessMsg] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const data = await fetchProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setFetchError(err.message || 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Auto-dismiss success toast
  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(() => setSuccessMsg(''), 4000);
    return () => clearTimeout(t);
  }, [successMsg]);

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter((p) => p.name?.toLowerCase().includes(q));
  }, [products, search]);

  /* ── Panel handlers ─────────────────────────────────────── */
  const openCreate = () => {
    setEditingProduct(null);
    setPanelOpen(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setEditingProduct(null);
  };

  const handleFormSuccess = (saved) => {
    closePanel();
    setSuccessMsg(
      editingProduct
        ? `"${saved.name}" updated successfully.`
        : `"${saved.name}" created successfully.`
    );
    loadProducts();
  };

  /* ── Delete handlers ─────────────────────────────────────── */
  const requestDelete = (product) => {
    setDeleteTarget(product);
    setDeleteError('');
  };

  const cancelDelete = () => {
    if (deleteLoading) return;
    setDeleteTarget(null);
    setDeleteError('');
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    setDeleteError('');
    try {
      await adminDeleteProduct(deleteTarget._id);
      setSuccessMsg(`"${deleteTarget.name}" deleted successfully.`);
      setDeleteTarget(null);
      loadProducts();
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete product.');
    } finally {
      setDeleteLoading(false);
    }
  };

  /* ── Image URL helper ───────────────────────────────────── */
  const resolveImg = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    if (url.startsWith('/api')) return `${BASE_URL}${url}`;
    return url;
  };


  /* ── Render ─────────────────────────────────────────────── */
  return (
    <AdminLayout title="Products">
      {/* Success alert */}
      {successMsg && (
        <div className="admin-alert admin-alert-success" role="status">
          <span>✅</span>
          <span>{successMsg}</span>
        </div>
      )}

      <div className="admin-card">
        {/* Toolbar */}
        <div className="admin-card-header">
          <h2 className="admin-card-title">
            All Products{' '}
            {!loading && (
              <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                ({filtered.length})
              </span>
            )}
          </h2>

          <div className="admin-toolbar">
            {/* Search */}
            <div className="admin-search-bar">
              <span className="admin-search-icon">🔍</span>
              <input
                type="search"
                placeholder="Search by name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search products"
              />
            </div>

            <button className="admin-btn admin-btn-primary" onClick={openCreate}>
              + Add Product
            </button>
          </div>
        </div>

        {/* Fetch error */}
        {fetchError && (
          <div className="admin-alert admin-alert-error" role="alert">
            <span>⚠️</span>
            <span>{fetchError}</span>
            <button
              className="admin-btn admin-btn-secondary"
              onClick={loadProducts}
              style={{ marginLeft: 'auto' }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="admin-loading">
            <div className="admin-spinner" />
            <span>Loading products…</span>
          </div>
        )}

        {/* Empty state */}
        {!loading && !fetchError && filtered.length === 0 && (
          <div className="admin-empty-state">
            <span className="empty-icon">📦</span>
            <p>
              {search
                ? `No products match "${search}".`
                : 'No products yet. Click "+ Add Product" to create one.'}
            </p>
          </div>
        )}

        {/* Desktop table */}
        {!loading && filtered.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Group</th>
                  <th>Price</th>
                  <th>Sizes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p._id}>
                    <td>
                      {p.imageUrl ? (
                        <img
                          src={resolveImg(p.imageUrl)}
                          alt={p.name}
                          className="admin-table-thumb"
                        />
                      ) : (
                        <div
                          className="admin-table-thumb"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-muted)',
                            fontSize: '0.7rem',
                          }}
                        >
                          N/A
                        </div>
                      )}
                    </td>
                    <td style={{ maxWidth: 220 }}>
                      <span
                        title={p.name}
                        style={{
                          fontWeight: 600,
                          display: 'block',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {p.name}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        /{p.slug}
                      </span>
                    </td>
                    <td>
                      <span className="admin-badge">{p.category}</span>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-group">{p.productGroup}</span>
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      ₹{Number(p.price).toLocaleString('en-IN')}
                    </td>
                    <td>
                      {p.hasSizes && p.sizes?.length > 0 ? (
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          {p.sizes.map((s) => String(s).replace(/[\[\]"'\\]/g, '').trim()).filter(Boolean).join(', ')}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>—</span>
                      )}
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          className="admin-btn admin-btn-secondary"
                          onClick={() => openEdit(p)}
                          aria-label={`Edit ${p.name}`}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="admin-btn admin-btn-danger"
                          onClick={() => requestDelete(p)}
                          aria-label={`Delete ${p.name}`}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile cards */}
        {!loading && filtered.length > 0 && (
          <div className="admin-mobile-cards">
            {filtered.map((p) => (
              <div key={p._id} className="admin-mobile-card">
                {p.imageUrl ? (
                  <img
                    src={resolveImg(p.imageUrl)}
                    alt={p.name}
                    className="admin-mobile-card-img"
                  />
                ) : (
                  <div
                    className="admin-mobile-card-img"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-muted)',
                      fontSize: '0.7rem',
                    }}
                  >
                    N/A
                  </div>
                )}
                <div className="admin-mobile-card-body">
                  <div className="admin-mobile-card-name" title={p.name}>
                    {p.name}
                  </div>
                  <div className="admin-mobile-card-meta">
                    <span className="admin-badge" style={{ marginRight: '0.3rem' }}>
                      {p.category}
                    </span>
                    <span className="admin-badge admin-badge-group">{p.productGroup}</span>
                    {' · '}₹{Number(p.price).toLocaleString('en-IN')}
                  </div>
                  <div className="admin-mobile-card-actions">
                    <button
                      className="admin-btn admin-btn-secondary"
                      onClick={() => openEdit(p)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="admin-btn admin-btn-danger"
                      onClick={() => requestDelete(p)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide-in Form Panel */}
      {panelOpen && (
        <div className="admin-panel-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) closePanel();
        }}>
          <div className="admin-panel" role="dialog" aria-modal="true" aria-label={editingProduct ? 'Edit Product' : 'Add Product'}>
            <div className="admin-panel-header">
              <h2 className="admin-panel-title">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                className="admin-panel-close"
                onClick={closePanel}
                aria-label="Close panel"
              >
                ×
              </button>
            </div>
            <ProductForm
              product={editingProduct}
              onSuccess={handleFormSuccess}
              onCancel={closePanel}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Product?"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
            : ''
        }
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        isLoading={deleteLoading}
      />

      {/* Delete error (shown after dialog stays open on error) */}
      {deleteError && deleteTarget && (
        <div className="admin-alert admin-alert-error" style={{ marginTop: '1rem' }} role="alert">
          <span>⚠️</span>
          <span>{deleteError}</span>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminProducts;
