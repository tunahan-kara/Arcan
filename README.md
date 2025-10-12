🖼️ Aluminum Print Web Application

This project is a Next.js + TailwindCSS-based prototype e-commerce website that allows users to upload their own photos, select print sizes, and order custom aluminum wall prints.

🚀 Features

Hero Slideshow
Smooth background slideshow with dual-layer blur and sharp image transition effect.
Product Section
Upload image (JPG/PNG, max 25 MB)
Size options (A1 – A4)
Portrait/Landscape orientation toggle
Fit / Crop & Fill preview modes
Dynamic price and resolution validation

Shopping Cart
Add items, adjust quantity, remove or clear cart.
(Payment integration planned for Milestone 8.)

FAQ & Contact Sections
Includes template content for Privacy / KVKK / Return policies, plus WhatsApp and email links.

Showcase Gallery
Responsive image grid with hover zoom and lightbox preview animation.

Responsive Design
Minimal and corporate layout optimized for all devices.

⚙️ Tech Stack
Layer	Technology
Framework	Next.js 14 (App Router)
Styling	Tailwind CSS + Framer Motion
State Management	Zustand (store for cart)
Image Handling	next/image, lazy loading, WebP support
Deployment (planned)	Vercel / Custom Domain + SSL

🧩 Directory Structure
/app
 ├─ components/
 │   ├─ Header.tsx
 │   ├─ Hero.tsx
 │   ├─ Gallery.tsx
 │   ├─ HowItWorks.tsx
 │   ├─ Product.tsx
 │   └─ Section.tsx
 ├─ order/
 │   └─ page.tsx
 ├─ cart/
 │   └─ page.tsx
 ├─ store/
 │   └─ cart.ts
 ├─ globals.css
 └─ page.tsx
/public
 ├─ gallery/...
 └─ hero/...

🧠 Future Plans

🛒 Payment integration (Iyzico / Shopier / Stripe)
🖼️ Frame overlay visuals for A1 – A4 previews
⚙️ Admin dashboard for order tracking
🌐 Custom domain + SSL deployment
📱 PWA version for mobile devices

👤 Developer

Tunahan Kara
www.linkedin.com/in/tunahankaraaa
🎓 Computer Engineering Student @ Sivas Cumhuriyet University
