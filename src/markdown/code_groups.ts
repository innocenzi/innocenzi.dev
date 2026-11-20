import type { Element } from 'hast';
import type { HastPluginDefinition, MdastPluginDefinition } from 'satteri';

import { t } from '../i18n';

// Turns `:::code-group` into a container the hast plugin below can find. Other directives are dropped, as Sätteri does by default.
export const codeGroupDirective: MdastPluginDefinition = {
	name: 'code-group-directive',
	containerDirective(node, ctx) {
		if (node.name !== 'code-group') {
			return;
		}

		ctx.setField(node, 'data', { hName: 'div', hProperties: { className: ['code-group'], dataCodeGroup: '' } });
	},
};

// The script in `prose.astro` shows the tab list and makes the blocks tab panels, so without JavaScript every block reads as a plain figure.
export const codeGroups = (): HastPluginDefinition => {
	let count = 0;

	return {
		name: 'code-groups',
		element: {
			filter: ['div'],
			visit(node, ctx) {
				if (!('dataCodeGroup' in node.properties)) {
					return;
				}

				const id = `code-group-${++count}`;
				const blocks = node.children.filter((child): child is Element => child.type === 'element' && child.tagName === 'figure');

				const tabs = blocks.map((block, index): Element => {
					ctx.setProperty(block, 'id', `${id}-panel-${index}`);

					return {
						type: 'element',
						tagName: 'button',
						properties: {
							type: 'button',
							role: 'tab',
							id: `${id}-tab-${index}`,
							ariaControls: [`${id}-panel-${index}`],
							ariaSelected: index === 0 ? 'true' : 'false',
							tabIndex: index === 0 ? 0 : -1,
						},
						children: [{ type: 'text', value: String(block.properties.dataName ?? block.properties.dataLanguage ?? '') }],
					};
				});

				ctx.prependChild(node, {
					type: 'element',
					tagName: 'div',
					properties: { role: 'tablist', ariaLabel: t.code.files_label, className: ['code-group-tabs'], hidden: true },
					children: tabs,
				});
			},
		},
	};
};
