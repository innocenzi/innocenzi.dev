// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import '~/main.css';
import 'prism-themes/themes/prism-hopscotch.css';
import DefaultLayout from '~/layouts/Default.vue';

export default function(Vue, { router, head, isClient }) {
	// Set the layout
	Vue.component('Layout', DefaultLayout);

	// Add icons
	const requirements = require.context('./components/icons', false, /[A-Z]\w+\.(vue|js)$/);
	requirements.keys().forEach((filename) => {
		const config = requirements(filename);
		const name = filename
			.split('/')
			.pop()
			.replace(/\.\w+$/, '');

		Vue.component(name, config.default ?? config);
	});

	// Add the theme switcher
	Vue.mixin({
		data: () => ({
			theme: 'dark',
		}),
		mounted() {
			const savedTheme = localStorage.getItem('theme');

			if (savedTheme) {
				this.setTheme(savedTheme);
				return;
			}

			const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
			const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

			this.setTheme(userPrefersDark ? 'dark' : userPrefersLight ? 'light' : this.theme);
		},
		computed: {
			isDarkTheme() {
				return this.theme === 'dark';
			},
			isLightTheme() {
				return this.theme === 'light';
			},
		},
		methods: {
			toggleTheme() {
				this.setTheme(this.isDarkTheme ? 'light' : this.isLightTheme ? 'dark' : this.theme);
			},
			setTheme(scheme) {
				localStorage.setItem('theme', scheme);
				document.querySelector('body').dataset.theme = scheme;
				this.theme = scheme;
			},
		},
	});
}
