import type { APIRoute } from 'astro';

import { me } from '../data/me';
import { locale, t } from '../i18n';
import { COLOURS } from '../logo/logo';

const manifest = {
	name: me.name,
	short_name: me.name,
	description: t.description,
	lang: locale,
	start_url: '/',
	display: 'browser',
	background_color: COLOURS.ground,
	theme_color: COLOURS.ground,
	icons: [
		{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
		{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
		{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
	],
};

export const GET: APIRoute = () => new Response(JSON.stringify(manifest), { headers: { 'Content-Type': 'application/manifest+json' } });
