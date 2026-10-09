import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, checkAdminAuth } from '../api/productsApi';
import './admin.css';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState('');

  // Redirect to /admin if already authenticated
  useEffect(() => {
    checkAdminAuth()
      .then(() => navigate('/admin', { replace: true }))
      .catch(() => {/* not logged in — stay on login page */})
      .finally(() => setCheckingAuth(false));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      await adminLogin(username.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="admin-login-page">
        <div className="admin-loading">
          <div className="admin-spinner" />
          <span>Checking session…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* Brand */}
        <div className="admin-login-brand">
          <span className="logo-name">⚡ Signature Sports</span>
          <span className="logo-sub">Kallambalam</span>
        </div>

        <p className="admin-login-title">Admin Panel</p>

        {/* Error */}
        {error && (
          <div className="admin-alert admin-alert-error" role="alert">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
          <div className="admin-form-group">
            <label htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              className="admin-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              disabled={loading}
              placeholder="admin"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary admin-login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="admin-btn-spinner" />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
