import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';

import { formatDate } from '../i18n';
import { COLOURS, SIGNATURE, signatureSvg } from '../logo/logo';
import type { SocialCard } from './pages';

const require = createRequire(import.meta.url);

const host = new URL(import.meta.env.SITE).host;

// Satori reads WOFF but not WOFF2 or variable fonts.
const fonts = await Promise.all([
	loadFont('iA Writer Quattro', '@fontsource/ia-writer-quattro/files/ia-writer-quattro-latin-400-normal.woff', 400),
	loadFont('Instrument Serif', '@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff', 400),
	loadFont('JetBrains Mono', '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff', 400),
]);

const signature = {
	src: `data:image/svg+xml;base64,${Buffer.from(signatureSvg(COLOURS.ink)).toString('base64')}`,
	width: Math.round((80 * SIGNATURE.viewBox.width) / SIGNATURE.viewBox.height),
	height: 80,
};

// Satori cannot read CSS variables, so colours come from COLOURS.
const label = { fontFamily: 'JetBrains Mono', fontSize: 22, color: COLOURS.faint };

export async function renderSocialCard({ title, description, date }: SocialCard): Promise<Uint8Array<ArrayBuffer>> {
	const card = {
		type: 'div',
		props: {
			style: {
				width: '100%',
				height: '100%',
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: 88,
				background: COLOURS.ground,
			},
			children: [
				{
					type: 'div',
					props: {
						style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' },
						children: [
							{ type: 'img', props: { src: signature.src, width: signature.width, height: signature.height } },
							{ type: 'div', props: { style: label, children: host } },
						],
					},
				},
				{
					type: 'div',
					props: {
						style: { display: 'flex', flexDirection: 'column', maxWidth: 940 },
						children: [
							date && { type: 'div', props: { style: { ...label, marginBottom: 20 }, children: formatDate(date) } },
							{
								type: 'div',
								props: {
									style: {
										display: 'block',
										lineClamp: 2,
										fontFamily: 'Instrument Serif',
										fontSize: 76,
										lineHeight: 1.04,
										letterSpacing: -0.76,
										color: COLOURS.ink,
									},
									children: title,
								},
							},
							{
								type: 'div',
								props: {
									style: {
										display: 'block',
										lineClamp: 2,
										marginTop: 24,
										fontFamily: 'iA Writer Quattro',
										fontSize: 32,
										lineHeight: 1.4,
										color: COLOURS.muted,
									},
									children: description,
								},
							},
						].filter(Boolean),
					},
				},
			],
		},
	};

	const svg = await satori(card as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });

	return new Uint8Array(new Resvg(svg).render().asPng());
}

async function loadFont(name: string, specifier: string, weight: 400 | 700) {
	const data = await readFile(require.resolve(specifier));

	return { name, data, weight, style: 'normal' as const };
}
