const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

/** Helper: throw a descriptive error from a JSON { error } response body */
async function handleResponse(res) {
  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
    } catch (_) {
      // ignore parse errors
    }
    throw new Error(message);
  }
  return res.json();
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Fetch all products, with optional query params.
 * @param {Record<string, string>} params  e.g. { group: 'shoes' }
 * @returns {Promise<Array>} flat array of product objects
 */
export async function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${BASE_URL}/api/products${query ? `?${query}` : ''}`;
  const res = await fetch(url, { credentials: 'include' });
  return handleResponse(res);
}

/**
 * Fetch a single product by its URL slug.
 * @param {string} slug
 */
export async function fetchProductBySlug(slug) {
  const res = await fetch(`${BASE_URL}/api/products/slug/${slug}`, {
    credentials: 'include',
  });
  return handleResponse(res);
}

/**
 * Fetch a single product by its MongoDB _id.
 * @param {string} id
 */
export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, {
    credentials: 'include',
  });
  return handleResponse(res);
}

// ─── Admin API ───────────────────────────────────────────────────────────────

/**
 * Admin login — starts a session cookie.
 * @param {string} username
 * @param {string} password
 */
export async function adminLogin(username, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(res);
}

/** Admin logout — destroys the session cookie. */
export async function adminLogout() {
  const res = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(res);
}

/**
 * Check whether the current session belongs to a valid admin.
 * Throws on 401 when not authenticated.
 */
export async function checkAdminAuth() {
  const res = await fetch(`${BASE_URL}/api/auth/me`, {
    credentials: 'include',
  });
  return handleResponse(res);
}

/**
 * Create a new product (multipart/form-data — includes image upload).
 * @param {FormData} formData
 */
export async function adminCreateProduct(formData) {
  const res = await fetch(`${BASE_URL}/api/admin/products`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  return handleResponse(res);
}

/**
 * Update an existing product.
 * @param {string} id  MongoDB _id
 * @param {FormData} formData
 */
export async function adminUpdateProduct(id, formData) {
  const res = await fetch(`${BASE_URL}/api/admin/products/${id}`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });
  return handleResponse(res);
}

/**
 * Delete a product by id.
 * @param {string} id  MongoDB _id
 */
export async function adminDeleteProduct(id) {
  const res = await fetch(`${BASE_URL}/api/admin/products/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return handleResponse(res);
}
