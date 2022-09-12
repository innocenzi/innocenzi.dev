import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import image from '@astrojs/image'
import prefetch from '@astrojs/prefetch'
import icons from 'unplugin-icons/vite'

export default defineConfig({
	integrations: [
		tailwind(),
		vue(),
		image(),
		prefetch(),
	],
	vite: {
		plugins: [
			icons({
				autoInstall: true,
				iconCustomizer(collection, icon, props) {
					props.width = ''
					props.height = ''
				},
			}),
		],
	},
})