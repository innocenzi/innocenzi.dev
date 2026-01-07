<script setup lang="ts">
import { useContributionGraph } from './use-contribution-graph'

interface Props {
	hideMonthLabels?: boolean
	class?: string
}

const $props = withDefaults(defineProps<Props>(), {
	hideMonthLabels: false,
})

const { weeks, width, height, blockSize, blockMargin, monthLabels } = useContributionGraph()
</script>

<template>
	<div :class="['max-w-full overflow-x-auto overflow-y-hidden', $props.class]">
		<svg class="block overflow-visible" :height :viewBox="`0 0 ${width} ${height}`" :width>
			<g v-if="!hideMonthLabels" class="fill-current">
				<text v-for="({ label, weekIndex }) in monthLabels" :key="weekIndex" dominant-baseline="hanging" :x="(blockSize + blockMargin) * weekIndex">
					{{ label }}
				</text>
			</g>
			<template v-for="(week, weekIndex) in weeks" :key="weekIndex">
				<template v-for="(activity, dayIndex) in week" :key="`${weekIndex}-${dayIndex}`">
					<slot v-if="activity" :activity :day-index="dayIndex" :week-index="weekIndex" />
				</template>
			</template>
		</svg>
	</div>
</template>
