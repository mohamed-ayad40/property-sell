<div align="center">

# 🏘️ Property Pulse

A full-stack real estate listing platform built with Next.js 16 — browse, search, and share property listings with authentication, image galleries, and cloud-hosted media.

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://next-auth.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

</div>

---

## ✨ Features

- **Property Listings** — Browse and search properties with detailed listing pages
- **Authentication** — Secure sign-in via NextAuth.js
- **Image Galleries** — Full-screen, swipeable property photo galleries powered by PhotoSwipe
- **Cloud Media Storage** — Property images uploaded and served via Cloudinary
- **Social Sharing** — Share listings directly to social platforms with react-share
- **Toast Notifications & Loaders** — Smooth UX feedback via react-toastify and react-spinners
- **Server-Side Rendering** — Built on Next.js 16 with the latest React 19 features
- **Responsive Design** — Fully responsive UI styled with Tailwind CSS 4

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Database | MongoDB + Mongoose |
| Authentication | NextAuth.js |
| Media Storage | Cloudinary |
| Image Gallery | PhotoSwipe + react-photoswipe-gallery |
| Notifications | react-toastify |
| Icons | React Icons |

---

## 📁 Project Structure

```
├── app/             # Next.js App Router pages and API routes
├── components/      # Reusable UI components
├── config/          # Database and service configuration
├── context/         # Global state management
├── models/          # Mongoose schemas
├── public/          # Static assets
├── utils/           # Helper functions
├── properties.json       # Seed data for property listings
├── properties_import.json # Bulk import data
└── proxy.js         # Proxy/middleware configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB database (Atlas or local)
- Cloudinary account
- NextAuth provider credentials (e.g. Google OAuth)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mohamed-ayad40/property-sell.git
cd property-sell

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a .env.local file with:
# MONGODB_URI=
# NEXTAUTH_SECRET=
# NEXTAUTH_URL=
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
# NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

MIT © [Mohamed Ayad](https://github.com/mohamed-ayad40)
