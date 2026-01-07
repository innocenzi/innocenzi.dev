<script setup lang="ts">
import type { Activity } from './use-contribution-graph'
import { THEME_CLASSES, useContributionGraph } from './use-contribution-graph'

const props = defineProps<{
	activity: Activity
	dayIndex: number
	weekIndex: number
	class?: string
}>()

const { blockSize, blockMargin, blockRadius, labelHeight, maxLevel } = useContributionGraph()

if (props.activity.level < 0 || props.activity.level > maxLevel.value) {
	throw new RangeError(
		`Provided activity level ${props.activity.level} for ${props.activity.date} is out of range. It must be between 0 and ${maxLevel.value}.`,
	)
}

const x = (blockSize.value + blockMargin.value) * props.weekIndex
const y = labelHeight.value + (blockSize.value + blockMargin.value) * props.dayIndex
</script>

<template>
	<rect
		:class="[THEME_CLASSES[activity.level], props.class]"
		:data-count="activity.count"
		:data-date="activity.date"
		:data-level="activity.level"
		:height="blockSize"
		:rx="blockRadius"
		:ry="blockRadius"
		:width="blockSize"
		:x
		:y
	/>
</template>
