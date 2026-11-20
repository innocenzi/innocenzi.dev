import type { HastPluginDefinition } from 'satteri';

// The id is set here because Astro's own heading ids are added after user plugins run, and it keeps existing ones.
export const headingAnchors = (): HastPluginDefinition => {
	const slugs = new Set<string>();

	return {
		name: 'heading-anchors',
		element: {
			filter: ['h2', 'h3', 'h4'],
			visit(node, ctx) {
				const id = typeof node.properties.id === 'string' ? node.properties.id : unique(slugify(ctx.textContent(node)), slugs);

				return {
					...node,
					properties: { ...node.properties, id },
					children: [{ type: 'element', tagName: 'a', properties: { href: `#${id}`, className: ['heading-anchor'] }, children: node.children }],
				};
			},
		},
	};
};

function slugify(text: string): string {
	return text
		.trim()
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.replace(/\s/g, '-');
}

function unique(slug: string, slugs: Set<string>): string {
	let candidate = slug;

	for (let index = 1; slugs.has(candidate); index++) {
		candidate = `${slug}-${index}`;
	}

	slugs.add(candidate);

	return candidate;
}
