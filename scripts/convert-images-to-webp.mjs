import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "images-source");
const outDir = path.join(root, "public", "images");

const supportedExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".tif",
  ".tiff",
  ".bmp",
  ".avif",
]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return [fullPath];
    }),
  );
  return files.flat();
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function convertFile(inputPath) {
  const relativePath = path.relative(sourceDir, inputPath);
  const parsed = path.parse(relativePath);
  const outputRelative = path.join(parsed.dir, `${parsed.name}.webp`);
  const outputPath = path.join(outDir, outputRelative);

  await ensureDir(path.dirname(outputPath));

  await sharp(inputPath).rotate().webp({ quality: 85 }).toFile(outputPath);

  return { inputPath, outputPath };
}

async function main() {
  await ensureDir(outDir);

  try {
    await fs.access(sourceDir);
  } catch {
    console.log(`Source folder not found: ${sourceDir}`);
    console.log("Create it and place your source images there.");
    process.exit(0);
  }

  const allFiles = await walk(sourceDir);
  const imageFiles = allFiles.filter((filePath) =>
    supportedExtensions.has(path.extname(filePath).toLowerCase()),
  );

  if (imageFiles.length === 0) {
    console.log(`No source images found in ${sourceDir}`);
    process.exit(0);
  }

  const results = [];
  for (const file of imageFiles) {
    const converted = await convertFile(file);
    results.push(converted);
  }

  console.log(`Converted ${results.length} image(s):`);
  for (const { inputPath, outputPath } of results) {
    console.log(
      `- ${path.relative(root, inputPath)} -> ${path.relative(root, outputPath)}`,
    );
  }
}

main().catch((error) => {
  console.error("Image conversion failed:", error);
  process.exit(1);
});
