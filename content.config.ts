import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
	collections: {
		blog: defineCollection({
			type: 'page',
			source: 'blog/**/*.md',
			schema: z.object({
				date: z.date(),
			}),
		}),
		snippets: defineCollection({
			type: 'page',
			source: 'snippets/**/*.md',
			schema: z.object({
				name: z.string(),
				description: z.string(),
				tags: z.array(z.string()).optional(),
			}),
		}),
	},
})
