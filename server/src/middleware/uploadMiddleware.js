const { S3Client, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');

// Helper: format/extract standard AWS region code (e.g. 'eu-north-1' from 'Europe (Stockholm) eu-north-1')
function formatAwsRegion(regionStr) {
  if (!regionStr) return 'us-east-1';
  const match = regionStr.match(/([a-z]{2}-[a-z]+-\d+)/i);
  return match ? match[1].toLowerCase() : regionStr.trim();
}

// ─── S3 CLIENT ────────────────────────────────────────────────────────────────
const s3Client = new S3Client({
  region: formatAwsRegion(process.env.AWS_REGION),
  credentials: {
    accessKeyId: (process.env.AWS_ACCESS_KEY_ID || '').trim(),
    secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY || '').trim(),
  },
});

// ─── FILE FILTER ──────────────────────────────────────────────────────────────
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function fileFilter(_req, file, cb) {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('INVALID_FILE_TYPE'), false);
  }
}

// ─── MULTER-S3 STORAGE ────────────────────────────────────────────────────────
const storage = multerS3({
  s3: s3Client,
  bucket: process.env.AWS_S3_BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: (_req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (_req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const uniqueKey = `products/${uuidv4()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, uniqueKey);
  },
});

// ─── MULTER UPLOAD INSTANCE ───────────────────────────────────────────────────
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

/** Single-file upload middleware bound to the 'image' field. */
const uploadSingle = upload.single('image');

// ─── S3 DELETE HELPER ─────────────────────────────────────────────────────────
/**
 * Deletes an object from S3 by its key.
 * @param {string} key - The S3 object key to delete.
 * @returns {Promise<void>}
 */
async function deleteS3Object(key) {
  if (!key || !process.env.AWS_S3_BUCKET) return;
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });
  await s3Client.send(command);
}

// ─── S3 PRESIGNED URL HELPER ──────────────────────────────────────────────────
/**
 * Generates a presigned GET URL for viewing private S3 objects.
 * @param {string} key - S3 object key.
 * @param {number} expiresIn - Expiry in seconds (default 3600 = 1 hour).
 * @returns {Promise<string|null>}
 */
async function getPresignedImageUrl(key, expiresIn = 3600) {
  if (!key || !process.env.AWS_S3_BUCKET || !process.env.AWS_ACCESS_KEY_ID) return null;
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    });
    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (err) {
    console.error('Error generating presigned URL for key:', key, err.message);
    return null;
  }
}

module.exports = { uploadSingle, s3Client, deleteS3Object, getPresignedImageUrl };

