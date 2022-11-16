export default defineNuxtConfig({
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	typescript: {
		shim: false,
	},
	modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image-edge', 'nuxt-icon'],
	content: {
		markdown: {
			remarkPlugins: ['remark-reading-time'],
		},
	},
})
