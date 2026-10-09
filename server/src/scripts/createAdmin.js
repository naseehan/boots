/**
 * createAdmin.js
 * Creates the initial admin user from environment variables.
 *
 * Usage:
 *   node src/scripts/createAdmin.js
 *
 * Required env vars:
 *   MONGODB_URI, ADMIN_INITIAL_USERNAME, ADMIN_INITIAL_PASSWORD
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const SALT_ROUNDS = 12;

async function createAdmin() {
  const { MONGODB_URI, ADMIN_INITIAL_USERNAME, ADMIN_INITIAL_PASSWORD } = process.env;

  if (!MONGODB_URI) {
    console.error('❌  MONGODB_URI is not set in environment.');
    process.exit(1);
  }
  if (!ADMIN_INITIAL_USERNAME || !ADMIN_INITIAL_PASSWORD) {
    console.error('❌  ADMIN_INITIAL_USERNAME and ADMIN_INITIAL_PASSWORD must be set in environment.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅  Connected to MongoDB');

    // Check if admin already exists
    const existing = await Admin.findOne({ username: ADMIN_INITIAL_USERNAME });
    if (existing) {
      console.log(`ℹ️  Admin "${ADMIN_INITIAL_USERNAME}" already exists. Skipping creation.`);
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(ADMIN_INITIAL_PASSWORD, SALT_ROUNDS);

    // Create admin document
    const admin = new Admin({ username: ADMIN_INITIAL_USERNAME, passwordHash });
    await admin.save();

    console.log(`🎉  Admin "${ADMIN_INITIAL_USERNAME}" created successfully.`);
  } catch (err) {
    console.error('❌  Failed to create admin:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('🔌  Disconnected from MongoDB');
  }
}

createAdmin();
