<script setup lang="ts">
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
			<h1
				class="w-full text-center font-karla text-5xl font-bold tracking-tighter text-zinc-300 md:w-auto md:text-start md:text-6xl"
				v-text="title"
			/>
			<span class="mt-3 w-full text-center md:w-auto md:text-left">
				<badge color="primary" class="w-full text-xl" :text="description" />
			</span>
		</div>

		<slot />
	</section>
</template>
