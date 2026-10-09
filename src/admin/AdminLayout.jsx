import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { checkAdminAuth, adminLogout } from '../api/productsApi';
import './admin.css';

/**
 * AdminLayout — wraps admin pages with sidebar + header.
 * Checks auth on every mount; redirects to /admin/login if unauthenticated.
 */
function AdminLayout({ title = 'Dashboard', children }) {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    checkAdminAuth()
      .then(() => setAuthChecked(true))
      .catch(() => navigate('/admin/login', { replace: true }));
  }, [navigate]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await adminLogout();
    } catch (_) {
      // ignore logout errors — still redirect
    }
    navigate('/admin/login', { replace: true });
  };

  if (!authChecked) {
    return (
      <div className="admin-loading" style={{ minHeight: '100vh' }}>
        <div className="admin-spinner" />
        <span>Loading…</span>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar" aria-label="Admin navigation">
        <div className="admin-sidebar-logo">
          <div className="logo-brand">⚡ Signature Sports</div>
          <div className="logo-sub">Admin Panel</div>
        </div>

        <nav className="admin-sidebar-nav" aria-label="Main menu">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? 'is-active' : ''}`
            }
          >
            <span className="nav-icon">📊</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? 'is-active' : ''}`
            }
          >
            <span className="nav-icon">📦</span>
            Products
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          Signature Sports © {new Date().getFullYear()}
        </div>
      </aside>

      {/* Header */}
      <header className="admin-header">
        <h1 className="admin-header-title">{title}</h1>
        <div className="admin-header-actions">
          <button
            className="admin-btn admin-btn-secondary"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? (
              <>
                <span className="admin-btn-spinner" />
                Logging out…
              </>
            ) : (
              '🚪 Logout'
            )}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="admin-main" id="admin-main-content">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
