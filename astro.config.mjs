import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
	site: 'https://bnau.github.io',
	base: '/blog',
	integrations: [mdx(), sitemap(), icon()],
});
