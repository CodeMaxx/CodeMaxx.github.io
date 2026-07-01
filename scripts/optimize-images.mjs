// Optimize images in place within a target directory (default: _site).
//
// Used by the GitHub Pages deploy workflow to optimize the *built* site only,
// leaving the committed source images in assets/ untouched. Raster images
// (jpg/png/gif) are re-encoded with sharp; SVGs are minified with svgo. A file
// is only rewritten if optimization actually makes it smaller, so the script
// is idempotent and safely skips unsupported/mislabeled files.
//
// Usage:  node scripts/optimize-images.mjs [dir]

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { optimize as svgoOptimize } from 'svgo';

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.svg']);

// Optimize a single image buffer. Returns the original buffer for anything
// that is not a supported image type.
export async function optimizeBuffer(buffer, ext) {
    switch (ext.toLowerCase()) {
        case '.svg': {
            const { data } = svgoOptimize(buffer.toString('utf8'));
            return Buffer.from(data);
        }
        case '.jpg':
        case '.jpeg':
            // .rotate() with no args applies the EXIF orientation before we
            // re-encode (sharp drops metadata, so orientation must be baked in).
            return sharp(buffer).rotate().jpeg({ quality: 80, mozjpeg: true }).toBuffer();
        case '.png':
            return sharp(buffer).rotate().png({ compressionLevel: 9, effort: 10 }).toBuffer();
        case '.gif':
            return sharp(buffer, { animated: true }).gif().toBuffer();
        default:
            return buffer;
    }
}

// Recursively optimize every supported image under `root`, in place.
export async function optimizeDirectory(root) {
    let count = 0, skipped = 0, before = 0, after = 0;

    async function walk(dir) {
        const entries = await readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                await walk(full);
                continue;
            }
            const ext = path.extname(entry.name).toLowerCase();
            if (!IMAGE_EXTS.has(ext)) continue;

            try {
                const input = await readFile(full);
                const output = await optimizeBuffer(input, ext);
                if (output.length < input.length) {
                    await writeFile(full, output);
                    count++;
                    before += input.length;
                    after += output.length;
                } else {
                    skipped++;
                }
            } catch (err) {
                skipped++;
                console.warn(`skip ${path.relative(root, full)}: ${err.message}`);
            }
        }
    }

    await walk(root);
    const mb = (n) => (n / 1024 / 1024).toFixed(2);
    console.log(
        `Optimized ${count} image(s) in ${root}: ` +
        `${mb(before)} MB -> ${mb(after)} MB (${skipped} skipped/unchanged)`
    );
}

// Run as a CLI when invoked directly.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    const root = process.argv[2] || '_site';
    optimizeDirectory(root).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
