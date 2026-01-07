<script setup lang="ts">
interface Props {
	class?: string
}

const props = defineProps<Props>()
</script>

<template>
	<div
		:class="[
			'flex flex-wrap gap-1 whitespace-nowrap sm:gap-x-4',
			props.class,
		]"
	>
		<slot />
	</div>
</template>
