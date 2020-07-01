module.exports = {
	siteName: 'Enzo Innocenzi',
	titleTemplate: '%s — Enzo Innocenzi',
	siteDescription: 'Hey. My name is Enzo Innocenzi. I am a software developer, with a particular focus on the web.',
	siteUrl: 'https://innocenzi.netlify.com',

	templates: {
		Article: '/article/:title',
		Tag: '/tag/:id',
	},

	plugins: [
		{
			use: '@gridsome/source-filesystem',
			options: {
				typeName: 'Article',
				baseDir: './content/articles',
				pathPrefix: '/article',
				path: '**/*.md',
				refs: {
					tags: {
						typeName: 'Tag',
						create: true,
					},
				},
			},
		},
	],

	transformers: {
		remark: {
			externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
			externalLinksTarget: '_self',
			plugins: ['@gridsome/remark-prismjs'],
		},
	},

	css: {
		loaderOptions: {
			postcss: {
				plugins: [require('tailwindcss'), require('postcss-nested'), require('postcss-font-magician')],
			},
		},
	},
};
