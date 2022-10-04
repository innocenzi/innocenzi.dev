<script setup lang="ts">
defineProps<{
	page: any
}>()
</script>

<template>
	<div class="flex justify-center gap-2 py-6 md:justify-end">
		<a
			v-if="page.url.prev"
			class="text-base uppercase text-gray-400 hover:underline"
			:href="page.url.prev"
			title="Go to Previous"
		>&larr; Prev</a>
		<a
			v-if="page.url.next"
			class="text-base uppercase text-gray-400 hover:underline"
			:href="page.url.next"
			title="Go to Next"
		>Next &rarr;</a>
	</div>
</template>
