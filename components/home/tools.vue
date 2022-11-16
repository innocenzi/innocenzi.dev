<script setup lang="ts">
import tools from '@/data/tools.json'

const categories = [
	{ name: 'Back-end', icon: 'bxs:terminal', tools: tools.filter(({ categories }) => categories.includes('back-end')) },
	{ name: 'Front-end', icon: 'mdi:palette-swatch-variant', tools: tools.filter(({ categories }) => categories.includes('front-end')) },
	{ name: 'Other', icon: 'mdi:briefcase-variant', tools: tools.filter(({ categories }) => !['back-end', 'front-end'].some((category) => categories.includes(category))) },
]
</script>

<template>
	<home-showcase title="Tools" description="Some of the other tools I am familiar with." align="left">
		<div class="mx-auto mt-16 grid w-10/12 grid-cols-1 justify-center gap-20 md:w-full lg:grid-cols-2">
			<home-tool-category
				v-for="category in categories"
				:key="category.name"
				:icon="category.icon"
				:name="category.name"
				:tools="category.tools"
			/>
		</div>
	</home-showcase>
</template>
