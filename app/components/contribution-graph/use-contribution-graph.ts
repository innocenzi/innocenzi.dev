import type { Day as WeekDay } from 'date-fns'
import { differenceInCalendarDays, eachDayOfInterval, formatISO, getDay, getMonth, getYear, nextDay, parseISO, subWeeks } from 'date-fns'
import { computed, type ComputedRef, inject, type InjectionKey, provide } from 'vue'

export interface Activity {
	date: string
	count: number
	level: number
}

type Week = Array<Activity | undefined>

export interface Labels {
	months?: string[]
	weekdays?: string[]
	totalCount?: string
	legend?: {
		less?: string
		more?: string
	}
}

interface MonthLabel {
	weekIndex: number
	label: string
}

const DEFAULT_MONTH_LABELS = [
	'jan',
	'feb',
	'mar',
	'apr',
	'may',
	'jun',
	'jul',
	'aug',
	'sep',
	'oct',
	'nov',
	'dec',
]

const DEFAULT_LABELS: Labels = {
	months: DEFAULT_MONTH_LABELS,
	weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	totalCount: '{{count}} activities in {{year}}',
	legend: {
		less: 'Less',
		more: 'More',
	},
}

export const THEME_CLASSES = [
	'fill-zinc-100 dark:fill-zinc-900',
	'fill-zinc-300 dark:fill-zinc-800',
	'fill-zinc-400 dark:fill-zinc-700',
	'fill-zinc-600 dark:fill-zinc-500',
	'fill-zinc-800 dark:fill-zinc-400',
]

interface ContributionGraphContext {
	data: ComputedRef<Activity[]>
	weeks: ComputedRef<Week[]>
	blockMargin: ComputedRef<number>
	blockRadius: ComputedRef<number>
	blockSize: ComputedRef<number>
	fontSize: ComputedRef<number>
	labels: ComputedRef<Labels>
	labelHeight: ComputedRef<number>
	maxLevel: ComputedRef<number>
	totalCount: ComputedRef<number>
	weekStart: ComputedRef<WeekDay>
	year: ComputedRef<number>
	width: ComputedRef<number>
	height: ComputedRef<number>
	monthLabels: ComputedRef<MonthLabel[]>
}

const ContributionGraphKey: InjectionKey<ContributionGraphContext> = Symbol('ContributionGraph')

const fillHoles = (activities: Activity[]): Activity[] => {
	if (activities.length === 0) {
		return []
	}

	const sortedActivities = [...activities].sort((a, b) => a.date.localeCompare(b.date))

	const calendar = new Map<string, Activity>(
		activities.map((a) => [a.date, a]),
	)

	const firstActivity = sortedActivities[0] as Activity
	const lastActivity = sortedActivities.at(-1)

	if (!lastActivity) {
		return []
	}

	return eachDayOfInterval({
		start: parseISO(firstActivity.date),
		end: parseISO(lastActivity.date),
	}).map((day) => {
		const date = formatISO(day, { representation: 'date' })

		if (calendar.has(date)) {
			return calendar.get(date) as Activity
		}

		return {
			date,
			count: 0,
			level: 0,
		}
	})
}

const groupByWeeks = (
	activities: Activity[],
	weekStart: WeekDay = 0,
): Week[] => {
	if (activities.length === 0) {
		return []
	}

	const normalizedActivities = fillHoles(activities)
	const firstActivity = normalizedActivities[0] as Activity
	const firstDate = parseISO(firstActivity.date)
	const firstCalendarDate = getDay(firstDate) === weekStart
		? firstDate
		: subWeeks(nextDay(firstDate, weekStart), 1)

	const paddedActivities = [
		...(new Array(differenceInCalendarDays(firstDate, firstCalendarDate)).fill(
			undefined,
		) as Activity[]),
		...normalizedActivities,
	]

	const numberOfWeeks = Math.ceil(paddedActivities.length / 7)

	return new Array(numberOfWeeks)
		.fill(undefined)
		.map((_, weekIndex) => paddedActivities.slice(weekIndex * 7, weekIndex * 7 + 7))
}

const getMonthLabels = (
	weeks: Week[],
	monthNames: string[] = DEFAULT_MONTH_LABELS,
): MonthLabel[] => {
	return weeks
		.reduce<MonthLabel[]>((labels, week, weekIndex) => {
			const firstActivity = week.find((activity) => activity !== undefined)

			if (!firstActivity) {
				throw new Error(
					`Unexpected error: Week ${weekIndex + 1} is empty: [${week}].`,
				)
			}

			const month = monthNames[getMonth(parseISO(firstActivity.date))]

			if (!month) {
				const monthName = new Date(firstActivity.date).toLocaleString('en-US', {
					month: 'short',
				})
				throw new Error(
					`Unexpected error: undefined month label for ${monthName}.`,
				)
			}

			const prevLabel = labels.at(-1)

			if (weekIndex === 0 || !prevLabel || prevLabel.label !== month) {
				return labels.concat({ weekIndex, label: month })
			}

			return labels
		}, [])
		.filter(({ weekIndex }, index, labels) => {
			const minWeeks = 3

			if (index === 0) {
				return labels[1] && labels[1].weekIndex - weekIndex >= minWeeks
			}

			if (index === labels.length - 1) {
				return weeks.slice(weekIndex).length >= minWeeks
			}

			return true
		})
}

export interface ContributionGraphOptions {
	data: Activity[]
	blockMargin?: number
	blockRadius?: number
	blockSize?: number
	fontSize?: number
	labels?: Labels
	maxLevel?: number
	totalCount?: number
	weekStart?: WeekDay
}

export function provideContributionGraph(options: ContributionGraphOptions) {
	const LABEL_MARGIN = 8

	const data = computed(() => options.data)
	const blockMargin = computed(() => options.blockMargin ?? 4)
	const blockRadius = computed(() => options.blockRadius ?? 2)
	const blockSize = computed(() => options.blockSize ?? 12)
	const fontSize = computed(() => options.fontSize ?? 14)
	const maxLevel = computed(() => Math.max(1, options.maxLevel ?? 4))
	const weekStart = computed(() => options.weekStart ?? 0)

	const labels = computed(() => ({
		...DEFAULT_LABELS,
		...options.labels,
	}))

	const weeks = computed(() => groupByWeeks(data.value, weekStart.value))

	const labelHeight = computed(() => fontSize.value + LABEL_MARGIN)

	const year = computed(() =>
		data.value.length > 0
			? getYear(parseISO(data.value[0]!.date))
			: new Date().getFullYear()
	)

	const totalCount = computed(() =>
		typeof options.totalCount === 'number'
			? options.totalCount
			: data.value.reduce((sum, activity) => sum + activity.count, 0)
	)

	const width = computed(() => weeks.value.length * (blockSize.value + blockMargin.value) - blockMargin.value)

	const height = computed(() => labelHeight.value + (blockSize.value + blockMargin.value) * 7 - blockMargin.value)

	const monthLabels = computed(() => getMonthLabels(weeks.value, labels.value.months))

	const context: ContributionGraphContext = {
		data,
		weeks,
		blockMargin,
		blockRadius,
		blockSize,
		fontSize,
		labels,
		labelHeight,
		maxLevel,
		totalCount,
		weekStart,
		year,
		width,
		height,
		monthLabels,
	}

	provide(ContributionGraphKey, context)

	return context
}

export function useContributionGraph() {
	const context = inject(ContributionGraphKey)

	if (!context) {
		throw new Error(
			'useContributionGraph must be used within a ContributionGraph component',
		)
	}

	return context
}
