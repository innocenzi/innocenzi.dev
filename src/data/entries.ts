import { type CollectionEntry, getCollection } from 'astro:content';

import { locale, t } from '../i18n';

export interface SnippetGroup {
	name: string;
	snippets: Array<CollectionEntry<'snippets'>>;
}

// Newest first.
export async function getPosts(): Promise<Array<CollectionEntry<'blog'>>> {
	return (await getCollection('blog')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// Grouped by their first tag, groups and snippets in alphabetical order.
export async function getSnippetGroups(): Promise<SnippetGroup[]> {
	const groups = Map.groupBy(await getCollection('snippets'), snippetGroup);

	return [...groups]
		.map(([name, snippets]) => ({ name, snippets: snippets.sort((a, b) => a.data.name.localeCompare(b.data.name, locale)) }))
		.sort((a, b) => a.name.localeCompare(b.name, locale));
}

// Its first tag, or `other` without tags.
function snippetGroup(snippet: CollectionEntry<'snippets'>): string {
	return snippet.data.tags[0]?.toLowerCase() ?? t.snippets.other;
}

// The languages of its code blocks, then its other tags, as in `ts · browser`.
export function snippetDetails(snippet: CollectionEntry<'snippets'>): string {
	const languages = [...(snippet.body ?? '').matchAll(/^\s*(?:`{3,}|~{3,})(\w[\w+-]*)/gm)].map(([, language]) => language!.toLowerCase());
	const tags = snippet.data.tags.slice(1).map((tag) => tag.toLowerCase());

	return [...new Set([...languages, ...tags])].join(' · ');
}
