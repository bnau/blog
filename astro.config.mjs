import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
	site: 'https://bertrand-nau.fr',
	integrations: [
		mdx(),
		sitemap({
			serialize(item) {
				// Add lastmod (ISO date string)
				item.lastmod = new Date().toISOString();

				// Set priority based on URL patterns
				// Formations pages (highest priority for AEO)
				if (item.url.includes('/formations/') && !item.url.endsWith('/formations/')) {
					item.priority = 1.0;
				}
				// Formations catalog page
				else if (item.url.endsWith('/formations/')) {
					item.priority = 1.0;
				}
				// Homepage (high priority)
				else if (item.url === 'https://bertrand-nau.fr/') {
					item.priority = 0.9;
				}
				// About page (important for Person schema)
				else if (item.url.endsWith('/about/')) {
					item.priority = 0.8;
				}
				// Blog posts
				else if (item.url.includes('/blog/') && !item.url.endsWith('/blog/')) {
					item.priority = 0.7;
				}
				// Blog catalog
				else if (item.url.endsWith('/blog/')) {
					item.priority = 0.7;
				}
				// Talks
				else if (item.url.includes('/talks/')) {
					item.priority = 0.6;
				}
				// Veille
				else if (item.url.includes('/veille/')) {
					item.priority = 0.5;
				}
				// Default
				else {
					item.priority = 0.5;
				}

				return item;
			},
		}),
		icon(),
	],
});
