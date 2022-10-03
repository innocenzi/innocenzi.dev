<script setup lang="ts">
import tools from '../../data/tools.json'
import Showcase from './showcase.vue'
import ToolCategory from './tool-category.vue'

const categories = [
	{ name: 'Back-end', icon: 'backend', tools: tools.filter(({ categories }) => categories.includes('back-end')) },
	{ name: 'Front-end', icon: 'frontend', tools: tools.filter(({ categories }) => categories.includes('front-end')) },
	{ name: 'Other', icon: 'other', tools: tools.filter(({ categories }) => !['back-end', 'front-end'].some((category) => categories.includes(category))) },
]
</script>

<template>
	<Showcase title="Tools" description="Some of the other tools I am familiar with." align="left">
		<div class="mx-auto mt-16 grid w-10/12 grid-cols-1 justify-center gap-20 md:w-full lg:grid-cols-2">
			<ToolCategory
				v-for="category in categories"
				:key="category.name"
				:icon="category.icon"
				:name="category.name"
				:tools="category.tools"
			/>
		</div>
	</Showcase>
</template>
