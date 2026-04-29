# QuiloCart

QuiloCart is a multi-role e-commerce platform built with the MERN stack. It supports three distinct roles — customers, merchants, and admins — with a complete order lifecycle, Razorpay payment integration, merchant wallet settlements, and Cloudinary-powered image uploads.

**Live Demo:** [quilocart.vercel.app](https://quilocart.vercel.app)

---

## Features

**Customer**
- Register and login with JWT-based authentication
- Browse and search products by category
- Manage cart, wishlist, and saved addresses
- Checkout with COD, Razorpay, or wallet balance
- Track orders and cancel with automatic wallet refund

**Merchant**
- Register and get approved by admin before selling
- Create, edit, and delete products with image uploads
- Fulfill orders through a managed pipeline (confirm → ship → deliver)
- View sales analytics and wallet settlements

**Admin**
- Approve, reject, or block merchant accounts
- Manage categories and oversee all platform orders

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Redux Toolkit, React Router v7, Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express 5, MongoDB, Mongoose, JWT |
| Payments | Razorpay (HMAC-SHA256 signature verification) |
| Uploads | Cloudinary, Multer |
| Infra | Vercel (frontend), Render (backend), MongoDB Atlas |

---

```
## Running Locally

```bash
# Backend
cd server && npm install && npm run dev

# Frontend
cd client && npm install && npm run dev
```

**Required env vars — backend**
```
MONGO_URI, JWT_SECRET, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET,
CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLIENT_URL
```

**Required env vars — frontend**
```
VITE_API_URL
```
```