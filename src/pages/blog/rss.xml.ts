import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

import { getPosts } from '../../data/entries';
import { locale, t } from '../../i18n';

export const GET: APIRoute = async ({ site }) => {
	const posts = await getPosts();

	return rss({
		title: t.blog.feed_title,
		description: t.blog.description,
		site: site!,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			link: `/blog/${post.id}/`,
		})),
		customData: `<language>${locale}</language>`,
	});
};
