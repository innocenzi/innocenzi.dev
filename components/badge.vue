<script setup lang="ts">
defineProps<{
	color: 'primary' | 'secondary'
	transparent?: boolean
	class?: string
	text?: string
}>()
</script>

<template>
	<span
		:class="[
			$props.class,
			'rounded-full md:whitespace-nowrap',
			{
				'text-pink-200/90': color === 'primary',
				'text-teal-200/90': color === 'secondary',
				'md:bg-pink-200/10': color === 'primary' && !transparent,
				'md:bg-teal-200/10': color === 'secondary' && !transparent,
				'md:px-3 md:py-0.5': !transparent,
			},
		]"
	>
		<slot>{{ text }}</slot>
	</span>
</template>
