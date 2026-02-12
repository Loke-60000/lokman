/**
 * Image Optimization Script
 *
 * Resizes oversized images in public/images/ to appropriate dimensions
 * for their actual display sizes (2x for retina), and re-compresses them.
 *
 * Run: node scripts/optimize-images.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const imagesDir = path.join(root, "public", "images");
const backupDir = path.join(root, "public", "images-backup");

// Target dimensions: 2x of max CSS display size for retina
// Format: { filename: { width, height, quality } }
const optimizations = {
  // Logo: CSS max-width 500px, so 2x = 1000px wide
  "lokmandevlogo.webp": { width: 1000, quality: 80 },

  // Braun ad: CSS 30% of ~2500px viewport max ≈ 750px, 2x = 1500px
  "braunstoreAdRemake.webp": { width: 1500, quality: 75 },

  // Carousel banners: displayed at max ~1000px wide
  "WEBSITE_bannerr_contactme_1.webp": { width: 1000, quality: 78 },
  "atchan_banner.webp": { width: 1000, quality: 78 },
  "WEBSITE_Gadgetlab_website.webp": { width: 1000, quality: 78 },

  // Project icons: CSS height 150px, so ~250px wide, 2x = 500px
  "amadeus.webp": { width: 500, quality: 78 },
  "rakugaki.webp": { width: 500, quality: 78 },
  "atchan.webp": { width: 500, quality: 78 },
};

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function optimizeImage(filename, opts) {
  const inputPath = path.join(imagesDir, filename);
  const backupPath = path.join(backupDir, filename);

  try {
    await fs.access(inputPath);
  } catch {
    console.log(`  ⚠ Skipping ${filename} (not found)`);
    return;
  }

  const originalStats = await fs.stat(inputPath);
  const originalKiB = (originalStats.size / 1024).toFixed(0);

  // Get current dimensions
  const metadata = await sharp(inputPath).metadata();

  // Skip if already smaller than target
  if (metadata.width <= opts.width) {
    console.log(
      `  ✓ ${filename} already ${metadata.width}px wide (target: ${opts.width}px) — skipping resize`,
    );
    return;
  }

  // Backup original
  await ensureDir(backupDir);
  try {
    await fs.access(backupPath);
    console.log(`  ℹ Backup already exists for ${filename}`);
  } catch {
    await fs.copyFile(inputPath, backupPath);
    console.log(`  📦 Backed up original ${filename}`);
  }

  // Resize and compress
  const quality = opts.quality || 80;
  await sharp(inputPath)
    .resize({ width: opts.width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(inputPath + ".tmp");

  // Replace original
  await fs.rename(inputPath + ".tmp", inputPath);

  const newStats = await fs.stat(inputPath);
  const newKiB = (newStats.size / 1024).toFixed(0);
  const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(0);

  console.log(
    `  ✅ ${filename}: ${metadata.width}x${metadata.height} → ${opts.width}px wide | ${originalKiB} KiB → ${newKiB} KiB (${savings}% saved)`,
  );
}

async function main() {
  console.log("🖼  Optimizing images for web performance...\n");

  for (const [filename, opts] of Object.entries(optimizations)) {
    await optimizeImage(filename, opts);
  }

  console.log("\n✨ Done! Originals backed up to public/images-backup/");
  console.log(
    "   To restore originals: cp public/images-backup/* public/images/",
  );
}

main().catch(console.error);
