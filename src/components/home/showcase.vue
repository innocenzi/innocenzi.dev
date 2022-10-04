<script setup lang="ts">
import Badge from '../badge.vue'

defineProps<{
	title: string
	description: string
	align: 'left' | 'right'
}>()
</script>

<template>
	<section class="flex w-full flex-col py-24">
		<div
			class="flex w-full flex-col justify-center"
			:class="{
				'items-start': align === 'left',
				'items-end': align === 'right',
			}"
		>
			<h1 class="font-karla w-full text-center text-5xl font-bold tracking-tighter text-zinc-300 md:w-auto md:text-start md:text-6xl">
				{{ title }}
			</h1>
			<span class="mt-3 w-full text-center md:w-auto md:text-left">
				<Badge color="primary" class=" w-full text-xl">
					{{ description }}
				</Badge>
			</span>
		</div>

		<slot />
	</section>
</template>
