import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function searchMetadata(siteUrl) {
  let origin = '';
  if (siteUrl) {
    const parsed = new URL(siteUrl);
    if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error('VITE_SITE_URL must be a website URL.');
    origin = parsed.origin;
  }
  return {
    name: 'portfolio-search-metadata',
    transformIndexHtml() {
      if (!origin) return [];
      return [
        { tag: 'link', attrs: { rel: 'canonical', href: `${origin}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: `${origin}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:image', content: `${origin}/images/ci-logo.png` }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${origin}/images/ci-logo.png` }, injectTo: 'head' },
        {
          tag: 'script', attrs: { type: 'application/ld+json' }, injectTo: 'head',
          children: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'Person',
            name: 'Chukwu Israel', jobTitle: 'Full Stack Web Developer',
            url: `${origin}/`, image: `${origin}/images/ci-logo.png`,
            sameAs: ['https://github.com/chukwuisrael146-gif'],
          }).replace(/</g, '\\u003c'),
        },
      ];
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}` });
      if (origin) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>` });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), searchMetadata(loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL)],

  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },

      '/media': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
}));
