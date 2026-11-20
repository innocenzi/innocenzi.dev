import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { getCollection } from 'astro:content';

import { locale } from '../i18n';
import { me } from './me';

// One day, as the API returns it. Level 0 to 4, as GitHub computes them.
export const contributionSchema = z.object({
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	count: z.number().int(),
	level: z.number().int().min(0).max(4),
});

export type Contribution = z.infer<typeof contributionSchema>;

export interface ContributionCalendar {
	// Columns of seven days, Sunday first. Days before the first contribution are empty.
	weeks: Array<Array<Contribution | undefined>>;
	months: Array<{ week: number; label: string }>;
	total: number;
}

const DAY = 24 * 60 * 60 * 1000;

// Months starting closer than this to either end of the calendar get no label, so labels never overlap.
const MIN_MONTH_WEEKS = 3;

// Dev server restarts and builds within this time reuse the last fetch instead of calling the API again.
const MAX_AGE = 60 * 60 * 1000;

// Oldest first. Empty when no fetch has succeeded yet.
export async function getContributions(): Promise<Contribution[]> {
	return (await getCollection('contributions')).map(({ data }) => data).sort((a, b) => a.date.localeCompare(b.date));
}

// Fetches when the dev server starts and when the site builds, so pages never wait on the API. The entries are kept on disk:
// a failed fetch leaves the last successful one in place, so the graph survives going offline.
export function contributionsLoader(): Loader {
	return {
		name: 'github-contributions',
		schema: contributionSchema,
		async load({ store, meta, logger, parseData }) {
			const fetchedAt = Number(meta.get('fetched_at') ?? 0);

			if (store.keys().length > 0 && Date.now() - fetchedAt < MAX_AGE) {
				return;
			}

			let contributions: Contribution[];

			try {
				contributions = await fetchContributions();
			} catch (error) {
				const reason = error instanceof Error ? error.message : String(error);

				logger.warn(store.keys().length > 0 ? `Could not fetch contributions, keeping the previous ones: ${reason}` : `Could not fetch contributions: ${reason}`);

				return;
			}

			store.clear();

			for (const contribution of contributions) {
				store.set({ id: contribution.date, data: await parseData({ id: contribution.date, data: { ...contribution } }) });
			}

			meta.set('fetched_at', String(Date.now()));
		},
	};
}

export function toCalendar(contributions: Contribution[]): ContributionCalendar {
	if (contributions.length === 0) {
		return { weeks: [], months: [], total: 0 };
	}

	const days = fillGaps(contributions);
	const padding = new Date(days[0]!.date).getUTCDay();
	const padded = [...Array<undefined>(padding).fill(undefined), ...days];

	const weeks = Array.from({ length: Math.ceil(padded.length / 7) }, (_, index) => padded.slice(index * 7, index * 7 + 7));

	return {
		weeks,
		months: monthLabels(weeks),
		total: days.reduce((total, { count }) => total + count, 0),
	};
}

// Throws with the reason when the API fails or returns nothing usable. Malformed days are skipped.
async function fetchContributions(): Promise<Contribution[]> {
	const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${me.github}?y=last`, { signal: AbortSignal.timeout(10_000) });

	if (!response.ok) {
		throw new Error(`the API answered ${response.status}`);
	}

	const body: unknown = await response.json();
	const list = (body as { contributions?: unknown })?.contributions;

	const contributions = (Array.isArray(list) ? list : []).flatMap((item) => {
		const day = contributionSchema.safeParse(item);

		return day.success ? [day.data] : [];
	});

	if (contributions.length === 0) {
		throw new Error('the API returned no contributions');
	}

	return contributions.sort((a, b) => a.date.localeCompare(b.date));
}

function fillGaps(contributions: Contribution[]): Contribution[] {
	const byDate = new Map(contributions.map((contribution) => [contribution.date, contribution]));
	const first = new Date(contributions[0]!.date).getTime();
	const last = new Date(contributions.at(-1)!.date).getTime();

	return Array.from({ length: Math.round((last - first) / DAY) + 1 }, (_, index) => {
		const date = new Date(first + index * DAY).toISOString().slice(0, 10);

		return byDate.get(date) ?? { date, count: 0, level: 0 };
	});
}

function monthLabels(weeks: ContributionCalendar['weeks']): ContributionCalendar['months'] {
	const month = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
	const labels: ContributionCalendar['months'] = [];

	weeks.forEach((week, index) => {
		const label = month.format(new Date(week.find(Boolean)!.date));

		if (labels.at(-1)?.label !== label) {
			labels.push({ week: index, label });
		}
	});

	return labels.filter(({ week }, index) => {
		if (index === 0) {
			return (labels[1]?.week ?? weeks.length) - week >= MIN_MONTH_WEEKS;
		}

		return index < labels.length - 1 || weeks.length - week >= MIN_MONTH_WEEKS;
	});
}
