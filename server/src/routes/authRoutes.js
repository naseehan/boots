const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Admin = require('../models/Admin');

const router = express.Router();

// ─── LOGIN RATE LIMITER ───────────────────────────────────────────────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' },
});

// ─── VALIDATION RULES ─────────────────────────────────────────────────────────
const loginValidation = [
  body('username').trim().notEmpty().withMessage('Username is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

// ─── POST /login ──────────────────────────────────────────────────────────────
router.post('/login', loginLimiter, loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Regenerate session to prevent fixation attacks
    req.session.regenerate((err) => {
      if (err) {
        console.error('Session regeneration error:', err);
        return res.status(500).json({ error: 'Session error. Please try again.' });
      }
      req.session.adminId = admin._id.toString();
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error('Session save error:', saveErr);
          return res.status(500).json({ error: 'Session error. Please try again.' });
        }
        return res.status(200).json({ ok: true, username: admin.username });
      });
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ─── POST /logout ─────────────────────────────────────────────────────────────
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destroy error:', err);
      return res.status(500).json({ error: 'Could not log out. Please try again.' });
    }
    res.clearCookie('connect.sid');
    return res.status(200).json({ ok: true });
  });
});

// ─── GET /me ──────────────────────────────────────────────────────────────────
router.get('/me', async (req, res) => {
  if (!req.session || !req.session.adminId) {
    return res.status(401).json({ ok: false, error: 'Not authenticated.' });
  }

  try {
    const admin = await Admin.findById(req.session.adminId).select('username');
    if (!admin) {
      req.session.destroy(() => {});
      return res.status(401).json({ ok: false, error: 'Admin not found.' });
    }
    return res.status(200).json({ ok: true, username: admin.username });
  } catch (err) {
    console.error('GET /me error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
