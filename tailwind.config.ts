import { type Config } from 'tailwindcss'

export default {
	content: ['./src/**/*.{md,mdx,ts,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['InterVariable', 'ui-sans-serif', 'system-ui', '-apple-system'],
				karla: ['KarlaVariable', 'ui-sans-serif', 'system-ui', '-apple-system'],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
} satisfies Config
