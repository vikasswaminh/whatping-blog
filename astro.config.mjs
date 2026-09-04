// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config';

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  trailingSlash: 'ignore',
  prefetch: true,
  compressHTML: true,
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark', wrap: true },
  },
});
