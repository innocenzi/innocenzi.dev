import { getCollection } from 'astro:content';

import { me } from '../data/me';
import { t } from '../i18n';

export interface SocialCard {
	title: string;
	description: string;
	date?: Date;
}

// Keep in sync with the `path` each page hands to PageLayout, without its trailing slash.
export async function socialCards(): Promise<Array<{ path: string | undefined; card: SocialCard }>> {
	const posts = await getCollection('blog');
	const snippets = await getCollection('snippets');

	return [
		{ path: undefined, card: { title: me.name, description: t.home.tagline } },
		{ path: 'blog', card: { title: t.blog.title, description: t.blog.description } },
		{ path: 'projects', card: { title: t.projects.title, description: t.projects.description } },
		{ path: 'snippets', card: { title: t.snippets.title, description: t.snippets.description } },
		{ path: 'uses', card: { title: t.uses.title, description: t.uses.description } },
		...posts.map(({ id, data }) => ({ path: `blog/${id}`, card: { title: data.title, description: data.description, date: data.date } })),
		...snippets.map(({ id, data }) => ({ path: `snippets/${id}`, card: { title: data.name, description: data.description } })),
	];
}
