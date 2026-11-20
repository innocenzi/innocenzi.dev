import type { ElementContent } from 'hast';
import type { HastPluginDefinition } from 'satteri';

// Longer segments may still break inside, so they never overflow a narrow screen.
const MAX_SEGMENT_LENGTH = 24;

// Inline code wraps after a slash rather than at a hyphen, so `spatie/typescript-transformer` breaks as a path.
export const inlineCodePaths = (): HastPluginDefinition => ({
	name: 'inline-code-paths',
	element: {
		filter: ['code'],
		visit(node, ctx) {
			const parent = ctx.parent(node);
			const text = ctx.textContent(node);

			if ((parent && 'tagName' in parent && parent.tagName === 'pre') || !text.includes('/')) {
				return;
			}

			const children = text.split(/(?<=\/)/).map((segment): ElementContent => {
				if (segment.length > MAX_SEGMENT_LENGTH) {
					return { type: 'text', value: segment };
				}

				return { type: 'element', tagName: 'span', properties: { className: ['code-segment'] }, children: [{ type: 'text', value: segment }] };
			});

			return { ...node, children };
		},
	},
});
