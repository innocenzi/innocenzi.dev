<script setup lang="ts">
import { useContributionGraph } from './use-contribution-graph'

interface Props {
	class?: string
}

const props = defineProps<Props>()

const { totalCount, year, labels } = useContributionGraph()

const text = computed(() => {
	if (labels.value.totalCount) {
		return labels.value.totalCount
			.replace('{{count}}', String(totalCount.value))
			.replace('{{year}}', String(year.value))
	}

	return `${totalCount.value} activities in ${year.value}`
})
</script>

<template>
	<div :class="['text-gray-500', props.class]">
		<slot :total-count="totalCount" :year>
			{{ text }}
		</slot>
	</div>
</template>
