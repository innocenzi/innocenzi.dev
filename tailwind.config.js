const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	purge: ['./src/**/*.vue', './src/**/*.md'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Karla', ...fontFamily.sans],
			},
			rotate: {
				360: '360deg',
			},
		},
	},
	variants: {
		rotate: ['hover'],
		height: ['responsive'],
		display: ['last', 'responsive'],
		boxShadow: ['focus'],
	},
	plugins: [
		//
		require('tailwindcss-theming'),
	],
};
