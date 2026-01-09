import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	css: ['./app/style.css'],
	ssr: false,
	app: {
		head: {
			link: [
				{ rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' },
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
				{ rel: 'shortcut icon', href: '/favicon/favicon.ico' },
				{ rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
				{ rel: 'manifest', href: '/favicon/site.webmanifest' },
			],
			meta: [
				{ name: 'apple-mobile-web-app-title', content: 'Enzo Innocenzi' },
			],
		},
	},
	modules: [
		'@nuxt/content',
		'@nuxt/hints',
		'@nuxt/image',
		'@nuxt/ui',
		'@nuxtjs/color-mode',
	],
	colorMode: {
		preference: 'system',
		fallback: 'dark',
		storageKey: 'theme',
	},
	content: {
		build: {
			markdown: {
				highlight: {
					theme: {
						default: 'github-light',
						dark: 'github-dark',
					},
					langs: ['php', 'typescript', 'sh', 'sql'],
				},
			},
		},
	},
	icon: {
		mode: 'svg',
		serverBundle: 'local',
		customCollections: [{
			prefix: 'brand',
			dir: './app/icons/brands',
		}],
	},
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
})
