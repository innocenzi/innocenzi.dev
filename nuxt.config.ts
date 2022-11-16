export default defineNuxtConfig({
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
		head: {
			titleTemplate: '%s - Enzo Innocenzi',
			link: [
				{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
				{ rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
				{ rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
				{ rel: 'manifest', href: '/site.webmanifest' },
			],
			meta: [
				{ name: 'twitter:site', content: '@enzoinnocenzi' },
				{ name: 'twitter:creator', content: '@enzoinnocenzi' },
				{ property: 'og:site_name', content: 'Enzo Innocenzi' },
				{ property: 'og:image', content: '/og.jpg' },
				{ property: 'og:type', content: 'website' },
			],
		},
	},
	runtimeConfig: {
		domain: 'https://innocenzi.dev',
	},
	typescript: {
		shim: false,
	},
	content: {
		markdown: {
			remarkPlugins: ['remark-reading-time'],
		},
	},
	nitro: {
		prerender: {
			routes: ['/sitemap.xml'],
		},
	},
	modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image-edge', 'nuxt-icon'],
})
