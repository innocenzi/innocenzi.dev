export const me = {
	name: 'Enzo Innocenzi',
	// Published only in security.txt. Keep it off the pages.
	securityEmail: 'security@innocenzi.dev',
	github: 'innocenzi',
	twitter: '@enzoinnocenzi',
	socials: [
		{ network: 'GitHub', handle: '@innocenzi', url: 'https://github.com/innocenzi' },
		{ network: 'Bluesky', handle: '@innocenzi.dev', url: 'https://bsky.app/profile/innocenzi.dev' },
		// The footer lists networks without their handles, where a lone "x" reads as a typo.
		{ network: 'X', label: 'x.com', handle: '@enzoinnocenzi', url: 'https://x.com/enzoinnocenzi' },
	],

	// Linked from the text on the home and projects pages, see `home` and `projects.intro` in src/i18n/en.json.
	links: {
		jetfly: 'https://jetfly.com',
		laravel: 'https://laravel.com',
		hybridly: 'https://hybridly.dev',
		vue: 'https://vuejs.org',
		tailwind: 'https://tailwindcss.com',
		open_source: 'https://github.com/innocenzi',
		tempest: 'https://tempestphp.com',
	},
};
