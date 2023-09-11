<script setup lang="ts">
defineProps<{
	type: 'secondary' | 'warning' | 'success'
	text?: string
}>()
</script>

<template>
	<span
		class="inline-flex opacity-70 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
		:class="{
			'bg-orange-400/10 text-orange-200 ring-orange-400/20': type === 'warning',
			'bg-green-400/10 text-green-200 ring-green-400/20': type === 'success',
			'bg-gray-400/10 text-gray-200 ring-gray-400/20': type === 'secondary',
		}"
		title="This project is no longer maintained or relevant"
	>
		<slot>{{ text }}</slot>
	</span>
</template>
