import type { APIRoute } from 'astro';

import { iconSvg } from '../logo/logo';

export const GET: APIRoute = () => new Response(iconSvg(), { headers: { 'Content-Type': 'image/svg+xml' } });
