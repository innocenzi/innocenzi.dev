import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import image from '@astrojs/image'
import prefetch from '@astrojs/prefetch'

export default defineConfig({
	integrations: [
		tailwind(),
		vue(),
		image(),
		prefetch(),
	],
})
