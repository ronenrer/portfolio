import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../src/assets');

async function optimizeImages() {
    const files = fs.readdirSync(ASSETS_DIR).filter(file =>
        file.match(/\.(jpg|jpeg|png)$/i) && !file.includes('-1x') && !file.includes('-2x')
    );

    console.log(`Found ${files.length} images to process.\n`);

    for (const file of files) {
        const ext = path.extname(file);
        const basename = path.basename(file, ext);
        const inputPath = path.join(ASSETS_DIR, file);

        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Assuming original is 2x resolution
        const width2x = metadata.width;
        const width1x = Math.round(width2x / 2);

        const out1x = path.join(ASSETS_DIR, `${basename}-1x.webp`);
        const out2x = path.join(ASSETS_DIR, `${basename}-2x.webp`);

        console.log(`Processing ${file}...`);

        // Generate 1x WebP
        await image
            .resize({ width: width1x })
            .webp({ quality: 80, effort: 6 })
            .toFile(out1x);

        // Generate 2x WebP
        await image
            .resize({ width: width2x })
            .webp({ quality: 80, effort: 6 })
            .toFile(out2x);

        console.log(`✅ Generated ${basename}-1x.webp (${width1x}px) & ${basename}-2x.webp (${width2x}px)\n`);

        // Generate the React <picture> tag snippet for this image
        const componentSnippet = `
// Import at top of file:
import ${basename}1x from './assets/${basename}-1x.webp';
import ${basename}2x from './assets/${basename}-2x.webp';
import ${basename}Fallback from './assets/${file}';

// Usage:
<picture>
  <source type="image/webp" srcSet={\`\${${basename}1x} 1x, \${${basename}2x} 2x\`} />
  <img 
    src={${basename}Fallback} 
    alt="${basename.replace(/_/g, ' ')}" 
    className="w-full h-full object-cover object-top" 
    loading="lazy"
  />
</picture>
`;
        console.log(componentSnippet);
        console.log('-----------------------------------------\n');
    }
}

optimizeImages().catch(console.error);
