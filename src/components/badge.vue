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
			'rounded-full whitespace-nowrap',
			{
				'text-pink-900/80 dark:text-pink-200/90': color === 'primary',
				'text-teal-900/80 dark:text-teal-200/90': color === 'secondary',
				'bg-pink-100 dark:bg-pink-200/10': color === 'primary' && !transparent,
				'bg-teal-100 dark:bg-teal-200/10': color === 'secondary' && !transparent,
				'px-3 py-0.5': !transparent
			}
		]"
	><slot /></span>
</template>
