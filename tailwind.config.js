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

	// corePlugins: {
	// 	container: false,
	// },

	plugins: [
		require('tailwindcss-theming'),
		// function({ addComponents }) {
		// 	addComponents({
		// 		'.container': {
		// 			maxWidth: '100%',
		// 			'@screen sm': { maxWidth: '640px', padding: '0 4rem' },
		// 			'@screen md': { maxWidth: '768px', padding: '0 4rem' },
		// 			'@screen lg': { maxWidth: '1024px', padding: '0 4rem' },
		// 			'@screen xl': { maxWidth: '1100px', padding: '0 4rem' },
		// 		},
		// 	});
		// },
	],
};
