/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
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
}
