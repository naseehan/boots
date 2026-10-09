/**
 * requireAuth middleware
 * Protects routes that require an active admin session.
 * Expects req.session.adminId to be set after login.
 */
function requireAuth(req, res, next) {
  if (!req.session || !req.session.adminId) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }
  next();
}

module.exports = { requireAuth };
