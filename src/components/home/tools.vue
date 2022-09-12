<script setup lang="ts">
import tools from '../../data/tools.json'
import Showcase from './showcase.vue'
import StackItem from './stack-item.vue'
</script>

<template>
	<Showcase title="Tools" description="Some of the other tools I have used" align="right">
		<div class="mx-auto mt-16 grid w-10/12 grid-cols-1 justify-center gap-20 md:w-full lg:grid-cols-2">
			<!-- <StackItem
				v-for="tool in tools"
				:key="tool.name"
				:name="tool.name"
				:description="tool.description"
				:url="tool.url"
				:icon="tool.icon"
			/> -->
		</div>
	</Showcase>
</template>
