# Shoply

A small online shop built with React, Vite, Tailwind CSS, and React Router.

## Features

- Product catalog with search, category filters, and sorting
- Product detail pages
- Cart with per-product quantities, coupon codes, and order summary
- Local (client-only) authentication with register/login/logout, persisted to `localStorage`
- Protected routes for profile and checkout
- Basic checkout flow ending in an order confirmation page

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build
npm run preview   # preview the production build locally
```

## Notes

Authentication is local-only (no backend): user records and a hashed password
live in `localStorage`. This is fine for a demo, but is **not** a substitute
for real authentication — do not reuse this approach with real user passwords
in production.
