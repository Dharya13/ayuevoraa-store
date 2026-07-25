# Ayuevoraa Wellness — Storefront

A full e-commerce site: product catalog, cart, and real checkout via Razorpay,
built to deploy free on Vercel.

## What's already working
- Responsive storefront (desktop + mobile)
- Cart with quantity, persisted in the browser
- Real Razorpay checkout: `/api/create-order` creates a tamper-proof order
  server-side, `/api/verify-payment` verifies the signature after payment
- Currently loaded with 5 placeholder products — swap these out (see below)

## 1. Swap in your real products
Open `src/App.jsx`, find the `PRODUCTS` array near the top, and edit the
`name`, `price`, `tagline`, `ingredients`, and `ritual` fields.

**Important:** also update the matching `PRODUCTS` object in
`api/create-order.js` (id → price) so the prices match. The server-side copy
is the one that actually decides what gets charged — this is what stops
someone from editing the price in their browser before paying.

## 2. Get your Razorpay keys
1. Sign up free at https://dashboard.razorpay.com
2. Go to **Settings → API Keys → Generate Test Key** to start (switch to Live
   Mode keys later, after Razorpay approves your business KYC/GST docs —
   required since this sells a health product)
3. You'll get a **Key ID** (`rzp_test_...`) and a **Key Secret** — keep the
   Secret private, never commit it or put it in frontend code

## 3. Deploy to Vercel (free)
1. Push this folder to a GitHub repo
2. Go to https://vercel.com → **New Project** → import that repo
3. Vercel auto-detects the Vite app — click **Deploy**
4. Once deployed, go to **Project → Settings → Environment Variables** and add:
   - `VITE_RAZORPAY_KEY_ID` = your Key ID (safe to expose)
   - `RAZORPAY_KEY_ID` = your Key ID (used server-side by the API functions)
   - `RAZORPAY_KEY_SECRET` = your Key Secret (never exposed to the browser)
5. Redeploy (Vercel → Deployments → ⋯ → Redeploy) so the env vars take effect

Your site is now live at `your-project.vercel.app`, with real payments in
test mode. Test cards for Razorpay test mode: https://razorpay.com/docs/payments/payments/test-card-upi-details/

## 4. Go fully live
- Complete Razorpay's KYC (business PAN, GST, bank account) to switch from
  test to live keys — this is required to accept real money, not optional
- Swap the `rzp_test_...` keys for your live `rzp_live_...` keys in Vercel
- Optional: connect a custom domain under Vercel → Settings → Domains

## 5. Local development
```
npm install
npm run dev
```
The `/api` functions only run when deployed on Vercel (or via `vercel dev`
locally, if you install the Vercel CLI: `npm i -g vercel && vercel dev`).

## Connecting your domain (ayuevoraa.com via Hostinger)
1. In Vercel → your project → **Settings → Domains**, add `ayuevoraa.com` and
   `www.ayuevoraa.com`
2. Vercel shows you an A record (for the root domain) and a CNAME record
   (for `www`) to add
3. In Hostinger → **hPanel → Domains → DNS/Nameservers**, remove Hostinger's
   default A/CNAME records and add the ones Vercel gave you
4. In Vercel → Domains, set one of the two as the canonical domain (redirect
   the other to it) to avoid duplicate-content SEO issues
5. DNS changes can take a few hours (occasionally up to 48h) to propagate

## Where orders go
`api/verify-payment.js` emails you a summary of every paid order via
[Resend](https://resend.com) (free tier: 3,000 emails/month).
1. Sign up free at resend.com, grab your API key (no domain setup needed —
   the test sender `orders@resend.dev` works out of the box)
2. In Vercel, add env vars: `RESEND_API_KEY` and `ORDER_NOTIFICATION_EMAIL`
   (the inbox you want orders sent to)
3. That's it — no database required for a basic launch. For a searchable
   order history later, add a free database (Supabase or MongoDB Atlas) in
   the same function.

## Legal pages
Terms, Privacy, Refund, and Shipping pages are live at the bottom of the
site (footer links). All the business-specific details (business name,
support email, return window, shipping regions, FSSAI number, etc.) live in
**one file: `src/business.js`**. Edit that file and every legal page updates
automatically — you don't need to touch the page text itself.

**This is currently filled with placeholders in `[brackets]`.** The site
will run fine with placeholders in place, but you should replace them with
real details before going live — Razorpay checks for genuine Terms/Refund/
Shipping policies before activating live payments.
