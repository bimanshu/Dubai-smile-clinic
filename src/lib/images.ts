import type { ImageMetadata } from 'astro';

const all = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.{jpg,png}', { eager: true });

/** Look up an image by its path inside src/assets, e.g. "services/veneers". */
export function img(path: string): ImageMetadata {
  const hit = Object.entries(all).find(([k]) => k.replace(/\.(jpg|png)$/, '').endsWith(`/assets/${path}`));
  if (!hit) throw new Error(`Missing image: ${path}`);
  return hit[1].default;
}
