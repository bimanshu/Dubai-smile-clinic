// Builds self-contained preview files from dist/: every image, font and script is inlined,
// so each page opens straight from disk (double-click) with no server and no network.
// Run `npm run build` first, or just `npm run preview:file`.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = 'dist';
const OUT = 'preview';
const pages = [
  { src: 'index.html', out: 'dubai-smile-preview-en.html' },
  { src: 'ar/index.html', out: 'dubai-smile-preview-ar.html' },
];
const fileFor = { '/': pages[0].out, '/ar/': pages[1].out };

const mime = {
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};
const cache = new Map();
const dataUri = (urlPath) => {
  if (!cache.has(urlPath)) {
    const file = join(DIST, urlPath.replace(/^\//, ''));
    cache.set(urlPath, `data:${mime[extname(file)]};base64,${readFileSync(file).toString('base64')}`);
  }
  return cache.get(urlPath);
};

// Pick one webp from a srcset: the smallest candidate at least `target` wide, else the largest.
const pickFromSrcset = (srcset, target = 900) => {
  const items = srcset
    .split(',')
    .map((s) => s.trim().split(/\s+/))
    .map(([url, w]) => ({ url, w: parseInt(w, 10) || 0 }))
    .sort((a, b) => a.w - b.w);
  return (items.find((i) => i.w >= target) ?? items[items.length - 1]).url;
};

if (!existsSync(DIST)) throw new Error('Run `npm run build` first');
mkdirSync(OUT, { recursive: true });

for (const page of pages) {
  let html = readFileSync(join(DIST, page.src), 'utf8');

  // Responsive <picture>: keep the wrapper, drop the <source>s, point the <img> at one inlined
  // AVIF sized for how large the image actually displays (sizes is a good proxy).
  html = html.replace(/(<picture[^>]*>)([\s\S]*?)<\/picture>/g, (_, open, inner) => {
    const avif = inner.match(/<source[^>]*type="image\/avif"[^>]*srcset="([^"]+)"/)?.[1];
    const img = inner.match(/<img[^>]*>/)[0];
    const sizes = img.match(/sizes="([^"]+)"/)?.[1] ?? '';
    const target = /^\s*[1-5]rem\s*$/.test(sizes) ? 200 : 720; // small avatars vs everything else
    const src = dataUri(avif ? pickFromSrcset(avif, target) : img.match(/src="([^"]+)"/)[1]);
    const cleaned = img
      .replace(/\s(srcset|sizes)="[^"]*"/g, '')
      .replace(/\sloading="lazy"/, ' loading="eager"')
      .replace(/src="[^"]+"/, `src="${src}"`);
    return `${open}${cleaned}</picture>`;
  });

  // Bundled module script -> inline (module scripts can't load from file://)
  html = html.replace(/<script type="module" src="(\/_astro\/[^"]+\.js)"><\/script>/g, (_, src) => {
    const code = readFileSync(join(DIST, src.replace(/^\//, '')), 'utf8');
    return `<script type="module">${code.replace(/<\/script/gi, '<\\/script')}</script>`;
  });

  // Font preloads aren't needed once fonts are inlined
  html = html.replace(/<link rel="preload"[^>]*as="font"[^>]*>/g, '');

  // Any remaining local asset reference (fonts in CSS, signature mask, favicon)
  html = html.replace(/(\/(?:_astro|fonts)\/[\w.\-]+\.(?:webp|avif|jpe?g|png|svg|woff2))/g, (m) => dataUri(m));
  html = html.replace(/href="\/favicon\.svg"/, `href="${dataUri('/favicon.svg')}"`);

  // Language switch and logo links point at the sibling preview file
  html = html.replace(/href="(\/|\/ar\/)"/g, (_, p) => `href="${fileFor[p]}"`);

  const outPath = join(OUT, page.out);
  writeFileSync(outPath, html);
  console.log(`${outPath}  ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} MB`);
}
