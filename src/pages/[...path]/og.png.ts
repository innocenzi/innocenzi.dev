import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from 'astro';

import { renderSocialCard } from '../../og/card';
import { socialCards } from '../../og/pages';

export const getStaticPaths = (async () => {
	const cards = await socialCards();

	return cards.map(({ path, card }) => ({ params: { path }, props: { card } }));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = async ({ props }) => new Response(await renderSocialCard(props.card), { headers: { 'Content-Type': 'image/png' } });
