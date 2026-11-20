import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { createCssVariablesTheme } from 'shiki/core';

import { codeBlocks } from './src/markdown/code_blocks';
import { codeGroupDirective, codeGroups } from './src/markdown/code_groups';
import { headingAnchors } from './src/markdown/heading_anchors';

export default defineConfig({
	site: 'https://innocenzi.dev',

	integrations: [
		sitemap({
			filter: (page) => !/\.(ico|png|svg|txt|webmanifest|xml)$/.test(page),
		}),
	],

	markdown: {
		shikiConfig: {
			// Colours come from `--shiki-*` in src/styles/global.css, so code follows the light and dark palettes.
			theme: createCssVariablesTheme(),
			transformers: [codeBlocks()],
		},
		processor: satteri({
			features: { directive: true },
			mdastPlugins: [codeGroupDirective],
			hastPlugins: [codeGroups, headingAnchors],
		}),
	},

	vite: {
		plugins: [tailwindcss()],
	},
});
