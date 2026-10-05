// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://dubaismile.com',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: { prefixDefaultLocale: false },
  },
  build: { inlineStylesheets: 'always' },
  image: { responsiveStyles: false },
  vite: { plugins: [tailwindcss()] },
});
