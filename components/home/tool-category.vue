<script setup lang="ts">
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
		<span class="mb-2 flex items-center font-karla text-xl font-medium uppercase tracking-wider transition">
			<icon :name="icon" class="mr-4 h-8 w-8" />
			<span class="text-pink-200/90" v-text="name" />
		</span>

		<div class="flex flex-wrap justify-center gap-y-2 md:justify-start">
			<template
				v-for="(tool, i) in tools"
				:key="tool.name"
			>
				<span class="flex items-center">
					<home-tool-item
						:name="tool.name"
						:url="tool.url"
					/>
					<span v-if="i < tools.length - 1" class="mx-3 opacity-30">•</span>
				</span>
			</template>
		</div>
	</div>
</template>
