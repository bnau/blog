import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		cover: image(),
	})
});

const talks = defineCollection({
	loader: glob({ base: './src/content/talks', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		conferences: z.array(
			z.object({
				name: z.string(),
				date: z.coerce.date(),
				replayLink: z.string().url().optional(),
			})
		).min(1),
	})
});

const veille = defineCollection({
	loader: glob({ base: './src/content/veille', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		pubDate: z.coerce.date(),
		themes: z.array(z.object({
			name: z.string(),
			articles: z.array(z.object({
				title: z.string(),
				link: z.string().url(),
				description: z.string().optional(),
			}))
		})),
		conference: z.object({
			title: z.string(),
			link: z.string().url(),
			description: z.string(),
		})
	})
});

export const collections = { blog, talks, veille };
