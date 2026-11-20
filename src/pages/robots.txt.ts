import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	const lines = ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap-index.xml', site)}`];

	return new Response(`${lines.join('\n')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
