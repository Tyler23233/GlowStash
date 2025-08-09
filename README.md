# GlowStash Starter (Next.js + Firebase)

## Quickstart
```bash
npm install
cp .env.local.example .env.local  # paste your Firebase web config
npm run dev
```

## Import sample products
- Visit `/admin/upload` and upload the CSV in `/data/glowstash-sample-products.csv`.

## Build & Deploy (Firebase Hosting static export)
```bash
npm run export
npx firebase login
npx firebase init hosting    # or edit .firebaserc with your project id
npx firebase deploy
```
> Note: This uses `next export` (static). It’s perfect for the MVP. All auth/product features run client-side.
