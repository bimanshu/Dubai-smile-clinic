import type { APIRoute } from 'astro';
import { DEMO } from '../lib/config';

// Demo builds keep search engines out so a preview never competes with the live site.
export const GET: APIRoute = ({ site }) => {
  const body = DEMO
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
