import { type Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

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
		typography(),
	],
} satisfies Config
