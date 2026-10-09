const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

/**
 * Compares a plain-text password against the stored hash.
 * @param {string} plain - The plain-text password to check.
 * @returns {Promise<boolean>}
 */
adminSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
