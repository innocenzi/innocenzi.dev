<script setup lang="ts">
import stack from '../../data/stack.json'
import Showcase from './showcase.vue'
import StackItem from './stack-item.vue'
</script>

<template>
	<Showcase title="Stack" description="Some tools make me specifically productive." align="left">
		<div class="mx-auto mt-12 grid w-10/12 grid-cols-1 justify-center gap-12 md:mt-28 md:w-full md:gap-20 lg:grid-cols-2">
			<StackItem
				v-for="tool in stack"
				:key="tool.name"
				:name="tool.name"
				:description="tool.description"
				:url="tool.url"
				:icon="tool.icon"
			/>
		</div>
	</Showcase>
</template>
