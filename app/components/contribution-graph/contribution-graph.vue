<script setup lang="ts">
import type { Activity, ContributionGraphOptions } from './use-contribution-graph'
import { provideContributionGraph } from './use-contribution-graph'

interface Props extends Omit<ContributionGraphOptions, 'data'> {
	data: Activity[]
	class?: string
}

const $props = withDefaults(defineProps<Props>(), {
	blockMargin: 4,
	blockRadius: 2,
	blockSize: 12,
	fontSize: 14,
	maxLevel: 4,
	weekStart: 0,
})

const context = provideContributionGraph({
	data: $props.data,
	blockMargin: $props.blockMargin,
	blockRadius: $props.blockRadius,
	blockSize: $props.blockSize,
	fontSize: $props.fontSize,
	labels: $props.labels,
	maxLevel: $props.maxLevel,
	totalCount: $props.totalCount,
	weekStart: $props.weekStart,
})
</script>

<template>
	<div v-if="data.length > 0" :class="['flex w-max max-w-full flex-col gap-2', $props.class]" :style="{ fontSize: `${context.fontSize.value}px` }">
		<slot />
	</div>
</template>
