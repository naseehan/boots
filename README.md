# Signature Sports — E-Commerce Storefront & Admin Dashboard

Signature Sports is a premier sports equipment storefront in Kallambalam, Kerala. This repository contains the complete full-stack application: a React + Vite customer-facing storefront, a Node.js + Express REST API backend, MongoDB Atlas database integration, Amazon S3 private image storage, and a protected Admin Dashboard for managing products.

---

## Architecture Overview

```
d:\Projects\boots\
├── server/                              # Node.js + Express Backend
│   ├── src/
│   │   ├── index.js                     # Express app setup, CORS, session, error handler
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js        # requireAuth session guard
│   │   │   └── uploadMiddleware.js      # Multer S3 upload & presigned URL generator
│   │   ├── models/
│   │   │   ├── Admin.js                 # Admin user schema with bcrypt password hashing
│   │   │   └── Product.js               # Product schema (collection: signature-products)
│   │   ├── routes/
│   │   │   ├── authRoutes.js            # POST /login, POST /logout, GET /me
│   │   │   ├── healthRoutes.js          # GET /api/health
│   │   │   ├── productRoutes.js         # Public: GET /, GET /slug/:slug, GET /:id, GET /image/:key
│   │   │   └── adminProductRoutes.js    # Protected: POST, PUT, DELETE /api/admin/products
│   │   └── scripts/
│   │       ├── createAdmin.js           # CLI script to create first admin account
│   │       └── migrate.js               # Safe idempotent migration of static products
│   ├── .env.example                     # Environment template (placeholders only)
│   └── package.json
│
├── src/                                 # React + Vite Frontend
│   ├── admin/                           # Protected Admin Panel
│   │   ├── AdminLayout.jsx              # Admin shell with sidebar & header
│   │   ├── AdminLogin.jsx               # /admin/login page with session authentication
│   │   ├── AdminProducts.jsx            # /admin/products management table & search
│   │   ├── ConfirmDialog.jsx            # Accessible delete confirmation modal
│   │   ├── ProductForm.jsx              # Add/Edit form with sizes and image preview
│   │   └── admin.css                    # Admin theme using brand design system
│   ├── api/
│   │   └── productsApi.js               # Fetch wrapper with session credentials
│   ├── components/                      # Storefront components (API-connected)
│   ├── pages/                           # Storefront pages (Home, Products, ProductDetails, etc.)
│   └── App.jsx                          # Router with /admin routes & conditional navbar/footer
│
└── package.json                         # Frontend dependencies & build scripts
```

---

## 1. Installation & Startup Commands

### Prerequisites
- Node.js v18+ and npm installed
- MongoDB Atlas cluster URL
- AWS S3 bucket with IAM credentials

### Backend Setup
```bash
cd server
npm install
```

To run in development mode (with hot reloading via nodemon):
```bash
npm run dev
```

To run in production mode:
```bash
npm start
```
The server will start on `http://localhost:5000` (or configured `PORT`).

### Frontend Setup
```bash
# In the project root directory:
npm install
```

To run the frontend development server:
```bash
npm run dev
```
The Vite development server will start on `http://localhost:5173`.

To build the frontend for production:
```bash
npm run build
```

---

## 2. Environment Variable Configuration

Create a `.env` file inside `server/` based on `server/.env.example`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/signature-sports?retryWrites=true&w=majority
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=ap-south-1
AWS_S3_BUCKET=signature-sports-products
ADMIN_INITIAL_USERNAME=admin
ADMIN_INITIAL_PASSWORD=YourStrongPassword123!
SESSION_SECRET=super-secret-crypto-random-session-string-32-chars
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Production Hosting Configuration
- In production (e.g. Render, Railway, Heroku, AWS ECS):
  - Set `NODE_ENV=production`.
  - Set `FRONTEND_URL` to your production frontend domain (e.g. `https://signature-sports.vercel.app`).
  - Session cookies automatically switch to `secure: true` (HTTPS only) and `httpOnly: true`.
- On your frontend hosting (e.g. Vercel):
  - Set `VITE_API_URL` to your production backend URL (e.g. `https://api.signaturesports.com`).

> **Security Note:** `.env` and `server/.env` are strictly excluded in `.gitignore` to prevent secret exposure.

---

## 3. Creating the First Admin Account

To securely create your initial administrator account without hardcoding credentials:

1. Define `ADMIN_INITIAL_USERNAME` and `ADMIN_INITIAL_PASSWORD` in `server/.env`.
2. Run the creation script from the `server` directory:
   ```bash
   cd server
   node src/scripts/createAdmin.js
   ```
3. The script:
   - Connects to MongoDB Atlas.
   - Checks if the user already exists (idempotent; will not duplicate or overwrite).
   - Hashes the password using `bcryptjs` with salt round 12.
   - Saves the admin user to the database and disconnects.

You can then log into the admin dashboard at `/admin/login`.

---

## 4. Amazon S3 Image Storage & Secure Private Viewing

### S3 Configuration & Security
- The Amazon S3 bucket retains **Block Public Access: ON**. Objects are never publicly readable.
- IAM user permissions should be restricted strictly to the required bucket:
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject"
        ],
        "Resource": "arn:aws:s3:::signature-sports-products/*"
      }
    ]
  }
  ```

### How Image Delivery Works
1. **Uploads**: The admin uploads an image file (JPEG, PNG, WebP) via multipart form data (`uploadSingle` middleware in Express). The file is stored under `products/<uuid>-<filename>`.
2. **Object Keys**: The S3 object key is stored in the MongoDB `imageKey` field.
3. **Presigned Viewing URLs**:
   - When products are fetched via `GET /api/products`, `GET /api/products/:id`, or `GET /api/products/slug/:slug`, the backend automatically generates a secure **AWS S3 presigned GET URL** with a 1-hour expiration time using `@aws-sdk/s3-request-presigner`.
   - Dedicated endpoint `GET /api/products/image/:key` provides a secure HTTP 302 redirect to a freshly signed URL.
4. **Image Replacement**: When an existing product image is replaced, the new image is uploaded first; after the database update succeeds, the previous S3 object is safely deleted via `deleteS3Object()`.
5. **Product Deletion**: When a product is deleted, its associated S3 object is permanently and safely removed from S3.

---

## 5. Migrating Existing Products

The existing 16 storefront products from `src/components/products.js` can be safely migrated to MongoDB Atlas using the provided migration script:

```bash
cd server
node src/scripts/migrate.js
```

### Migration Safety Features
- **Idempotent**: The script queries existing products by `slug`. Any product already present in the database is automatically skipped.
- **Zero Data Loss**: Existing product data is never deleted during migration.
- **Image Preservation**: Existing local product image paths (`/nike-mercury1.png`, `/balls/...`, `/board/...`, etc.) are preserved in `imageUrl`, while `imageKey` is set to `null`. The storefront continues rendering them from the frontend public assets without disruption.

---

## 6. How to Test the Entire System

### A. Health Check
```bash
curl http://localhost:5000/api/health
# Response: { "status": "ok", "db": "connected", "timestamp": "..." }
```

### B. Admin Authentication
1. Navigate to `http://localhost:5173/admin/login`.
2. Try invalid credentials → verify the error message appears.
3. Enter valid admin credentials → verify redirection to `/admin`.
4. Refresh `/admin` → verify session persists without re-prompting.
5. Click **Logout** → verify session is destroyed and you are redirected to `/admin/login`.
6. Try visiting `/admin` while logged out → verify automatic redirect to `/admin/login`.

### C. Add Product with Sizes
1. Go to `/admin`, click **+ Add Product**.
2. Enter Name, Price (e.g. `2499`), Category (`Footwear (Football)`), and Overview.
3. Check **"This product has sizes"**.
4. Type size `UK 8`, click **Add** (or press Enter). Add `UK 9` and `UK 10`. Remove one size using `×`.
5. Upload a product image (verify preview displays).
6. Click **Create Product** → verify success toast, new product in table, and sizes displayed as chips.

### D. Edit Product
1. Click **✏️ Edit** on any product in the admin table.
2. Update the price or overview.
3. Replace the image with a new file.
4. Click **Save Changes** → verify updated values in the table and S3 image cleanup.

### E. Delete Product
1. Click **🗑️ Delete** on a product.
2. An accessible confirmation modal appears: *"Are you sure you want to delete...?"*.
3. Click **Cancel** → dialog closes, product remains.
4. Click **Delete** → loading spinner displays, product is removed from database and S3, success alert is shown.

### F. Storefront Verification
1. Navigate to `http://localhost:5173/products` → verify the catalog loads from the backend.
2. Test category filtering (Footwear, Sports Balls, Racquets, Board Games).
3. Test sorting (Price: Low to High / High to Low).
4. Click a product → verify `/products/:slug` loads full product details, including available sizes if configured.
5. Verify Home page Best Sellers marquee and Related Products carousels function seamlessly.

---

## 7. Secure Deployment Guide

### Backend (Render / Railway / AWS ECS)
1. Add environment variables in your hosting provider's dashboard matching `server/.env.example`.
2. Ensure `NODE_ENV=production` and `FRONTEND_URL=https://your-storefront.vercel.app`.
3. Set your build command: `npm install` and start command: `npm start`.

### Frontend (Vercel)
1. In the Vercel project settings, add the environment variable:
   - `VITE_API_URL`: Your backend URL (e.g. `https://signature-sports-api.onrender.com`).
2. Build command: `npm run build`, Output directory: `dist`.

### MongoDB Atlas Checklist
- Whitelist the backend hosting provider IP addresses (or `0.0.0.0/0` if using dynamic cloud hosting with strong database authentication).
- Use a dedicated database user with readWrite privileges on `signature-sports`.

---

## License & Attribution
Signature Sports © All rights reserved.
