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

	corePlugins: {
		container: false,
	},

	plugins: [
		require('tailwindcss-theming'),
		function({ addComponents }) {
			addComponents({
				'.container': {
					maxWidth: '100%',
					'@screen sm': { maxWidth: '600px' },
					'@screen md': { maxWidth: '700px' },
					'@screen lg': { maxWidth: '800px' },
					'@screen xl': { maxWidth: '900px' },
				},
			});
		},
	],
};
