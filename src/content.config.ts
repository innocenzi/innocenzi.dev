import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

import { contributionsLoader } from './data/contributions';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
	}),
});

const snippets = defineCollection({
	loader: glob({ base: './src/content/snippets', pattern: '**/*.md' }),
	schema: z.object({
		name: z.string(),
		description: z.string(),
		tags: z.array(z.string()).default([]),
	}),
});

// The last year of GitHub contributions, one entry per day, for the graph on the projects page.
const contributions = defineCollection({
	loader: contributionsLoader(),
});

export const collections = { blog, snippets, contributions };
