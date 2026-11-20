import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from 'astro';

import { iconPng } from '../logo/logo';

// The touch icon, then the manifest's icons.
export const getStaticPaths = (() => [
	{ params: { icon: 'apple-touch-icon' }, props: { size: 180 } },
	{ params: { icon: 'icon-192' }, props: { size: 192 } },
	{ params: { icon: 'icon-512' }, props: { size: 512 } },
]) satisfies GetStaticPaths;

export const GET: APIRoute<InferGetStaticPropsType<typeof getStaticPaths>> = ({ props }) => {
	return new Response(new Uint8Array(iconPng(props.size)), { headers: { 'Content-Type': 'image/png' } });
};
