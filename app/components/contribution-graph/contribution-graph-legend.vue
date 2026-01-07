<script setup lang="ts">
import { THEME_CLASSES, useContributionGraph } from './use-contribution-graph'

interface Props {
	class?: string
}

const props = defineProps<Props>()

const { labels, maxLevel, blockSize, blockRadius } = useContributionGraph()

const levels = computed(() => Array.from({ length: maxLevel.value + 1 }, (_, i) => i))
</script>

<template>
	<div :class="['ml-auto flex items-center gap-0.5', props.class]">
		<span class="mr-1 text-gray-500">
			{{ labels.legend?.less || 'Less' }}
		</span>
		<template v-for="level in levels" :key="level">
			<slot :level>
				<svg :height="blockSize" :width="blockSize">
					<rect :class="THEME_CLASSES[level]" :data-level="level" :height="blockSize" :rx="blockRadius" :ry="blockRadius" :width="blockSize" />
				</svg>
			</slot>
		</template>
		<span class="ml-1 text-gray-500">
			{{ labels.legend?.more || 'More' }}
		</span>
	</div>
</template>
