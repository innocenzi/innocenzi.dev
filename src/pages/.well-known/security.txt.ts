import type { APIRoute } from 'astro';

import { me } from '../../data/me';
import { locale } from '../../i18n';

// RFC 9116. Expires a year after each build, so a deployed site always vouches for its contact.
export const GET: APIRoute = ({ site }) => {
	const expires = new Date();
	expires.setUTCFullYear(expires.getUTCFullYear() + 1);
	expires.setUTCHours(0, 0, 0, 0);

	const lines = [
		`Contact: mailto:${me.securityEmail}`,
		`Expires: ${expires.toISOString()}`,
		`Preferred-Languages: ${locale}`,
		`Canonical: ${new URL('.well-known/security.txt', site)}`,
	];

	return new Response(`${lines.join('\n')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
