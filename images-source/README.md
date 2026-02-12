# Source images (not served)

Put your editable source images here (`.png`, `.jpg`, `.jpeg`, etc.).

These files are not referenced by the website directly.

Run this to generate optimized `.webp` files into `public/images`:

npm run images:build

Directory structure is preserved. Example:

- `images-source/banner/home-hero.png`
- becomes `public/images/banner/home-hero.webp`
