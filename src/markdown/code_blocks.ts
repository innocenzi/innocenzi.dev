import type { ShikiConfig } from 'astro';
import type { Element, ElementContent } from 'hast';

import { t } from '../i18n';

type ShikiTransformer = NonNullable<ShikiConfig['transformers']>[number];

export function codeBlocks(): ShikiTransformer {
	return {
		name: 'code-blocks',
		pre(node) {
			// The well comes from the prose styles rather than from the theme.
			node.properties.style = String(node.properties.style ?? '').replace(/background-color:[^;]*;?/, '');
		},
		root(root) {
			const pre = root.children.find((child): child is Element => child.type === 'element');

			if (!pre) {
				return;
			}

			// The file name is in brackets in the meta, as in ```php [config/app.php].
			const name = this.options.meta?.__raw?.match(/\[([^\]]+)\]/)?.[1]?.trim();
			const language = this.options.lang;
			const caption = name ?? language;

			// The button stays out of the caption, which names the figure.
			const children: ElementContent[] = [
				// Right to left, so a long path is cut at its start and the file name stays visible.
				element('figcaption', { className: ['code-block-caption'], title: caption, dir: 'rtl' }, [element('bdi', {}, [text(caption)])]),
				element('button', { type: 'button', className: ['code-block-copy'], ariaLabel: t.code.copy_label, dataCopied: t.code.copied }, [
					copyIcon(),
					element('span', {}, [text(t.code.copy)]),
				]),
				pre,
				element('span', { role: 'status', className: ['sr-only'] }),
			];

			return {
				type: 'root',
				children: [element('figure', { className: ['code-block'], dataCodeBlock: '', dataName: name, dataLanguage: language }, children)],
			};
		},
	};
}

function element(tagName: string, properties: Element['properties'], children: ElementContent[] = []): Element {
	return { type: 'element', tagName, properties, children };
}

function text(value: string): ElementContent {
	return { type: 'text', value };
}

// Two overlapping pages, as in Lucide's `copy` icon.
function copyIcon(): Element {
	const properties = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', ariaHidden: 'true' };

	return element('svg', properties, [
		element('rect', { width: '14', height: '14', x: '8', y: '8', rx: '2' }),
		element('path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }),
	]);
}
