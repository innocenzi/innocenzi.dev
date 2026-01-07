import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
	collections: {
		blog: defineCollection({
			type: 'page',
			source: '**/*.md',
			schema: z.object({
				date: z.date(),
			}),
		}),
	},
})
