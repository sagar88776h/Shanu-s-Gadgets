# Shanu's Gadgets

Website for Shanu's Gadgets, Madhupur, Kamalasagar (Tripura): quality-checked
pre-owned phones plus brand-new AirPods, neckbands, covers and accessories.

Built with React, TypeScript, Vite and Tailwind CSS.

```bash
npm install
npm run dev      # local site at http://localhost:5173
npm run build    # production build in /dist
npm run lint
```

## How the shop is organised

Five categories, and every category has three tiers:

| Category    | Stock     | Tiers                         |
| ----------- | --------- | ----------------------------- |
| Phones      | Pre-owned | Normal, Mid-range, Premium    |
| AirPods     | Brand new | Normal, Mid-range, Premium    |
| Neckbands   | Brand new | Normal, Mid-range, Premium    |
| Covers      | Brand new | Normal, Mid-range, Premium    |
| Accessories | Brand new | Normal, Mid-range, Premium    |

Links can point straight to a category or a tier, which is handy for WhatsApp:

- `/#/products/phones`
- `/#/products/phones/premium`
- `/#/products/covers/mid-range`

## Add or edit a product

Everything lives in `src/data/storeData.ts`, in the `SEEDS` list.

1. Copy an existing entry.
2. Give it a unique `id`, a `category` (`phones`, `airpods`, `neckbands`, `covers`, `accessories`)
   and a `tier` (`normal`, `mid-range`, `premium`).
3. For a phone, fill in `condition` (grade, battery %, storage, RAM, box and bill).
4. Add the photo as `public/assets/products/<id>.jpg` and set `image: "/assets/products/<id>.jpg"`.
   Without `image`, the site looks for `<id>.svg`.

The product appears in the right category and tier automatically, and the
"from ₹" prices on the home page update on their own.

## Things to edit before launch

- **Sample content.** Every product, price, spec and battery % in `storeData.ts` is a placeholder.
  The illustrations in `public/assets/products/` are drawings, not photos of real stock.
- **Warranty terms.** `WARRANTY` in `storeData.ts`.
- **Phone checks list.** `USED_PHONE_CHECKS` in `storeData.ts`. Keep only what is really checked.
- **Reviews.** `REVIEWS` in `storeData.ts` are placeholders. Replace them with real customer reviews.
- **Store details** (phone, address, hours): `STORE_CONFIG` in `storeData.ts`.
- **Web address.** If you move to a custom domain, update the `canonical`, `og:url`, `og:image`
  and structured data URLs in `index.html`.
