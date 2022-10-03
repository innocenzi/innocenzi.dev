<script setup lang="ts">
defineProps<{
	color: 'primary' | 'secondary'
	transparent?: boolean
	class?: string
}>()
</script>

<template>
	<span
		:class="[
			$props.class,
			'md:whitespace-nowrap rounded-full',
			{
				'text-pink-900/80 dark:text-pink-200/90': color === 'primary',
				'text-teal-900/80 dark:text-teal-200/90': color === 'secondary',
				'md:bg-pink-100 dark:md:bg-pink-200/10': color === 'primary' && !transparent,
				'md:bg-teal-100 dark:md:bg-teal-200/10': color === 'secondary' && !transparent,
				'md:px-3 md:py-0.5': !transparent
			}
		]"
	><slot /></span>
</template>
