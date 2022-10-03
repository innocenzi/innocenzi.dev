<script setup lang="ts">
import Icon from '../icon.vue'
import ToolItem from './tool-item.vue'

defineProps<{
	name: string
	icon: string
	tools: Array<{
		name: string
		url: string
		categories: string[]
	}>
}>()
</script>

<template>
	<div class="flex flex-col items-center md:items-start">
		<span class="font-karla mb-2 flex items-center text-xl font-medium uppercase tracking-wider transition">
			<Icon :icon="(icon as any)" class="mr-4 h-8 w-8" />
			<span class="text-primary dark:text-pink-200/90" v-text="name" />
		</span>

		<div class="flex flex-wrap justify-center gap-y-2 md:justify-start">
			<template
				v-for="(tool, i) in tools"
				:key="tool.name"
			>
				<span class="flex items-center">
					<ToolItem
						:name="tool.name"
						:url="tool.url"
					/>
					<span v-if="i < tools.length - 1" class="mx-3 opacity-30">•</span>
				</span>
			</template>
		</div>
	</div>
</template>
