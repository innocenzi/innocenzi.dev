const siteUrl = 'https://innocenzi.netlify.com';

module.exports = {
	siteName: 'Enzo Innocenzi',
	titleTemplate: '%s — Enzo Innocenzi',
	siteDescription: 'Hey. My name is Enzo Innocenzi. I am a software developer, with a particular focus on the web.',
	siteUrl: siteUrl,

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
		{
			use: '@gridsome/plugin-sitemap',
			options: {
				exclude: [],
				include: ['/', '/articles', '/article/**'],
			},
		},
		{
			use: 'gridsome-plugin-rss',
			options: {
				contentTypeName: 'Article',
				feedOptions: {
					title: "Enzo Innocenzi's articles",
					feed_url: `${siteUrl}/rss.xml`,
					site_url: siteUrl,
				},
				feedItemOptions: (node) => {
					return {
						title: node.title,
						description: node.description,
						url: `${siteUrl}${node.path}`,
					};
				},
				output: {
					dir: './static',
					name: 'rss.xml',
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
