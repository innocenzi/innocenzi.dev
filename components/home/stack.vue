<script setup lang="ts">
import stack from '@/data/stack.json'
</script>

<template>
	<home-showcase title="Stack" description="Here are the tools I'm most productive with." align="right">
		<div class="mx-auto mt-12 grid w-10/12 grid-cols-1 justify-center gap-12 md:mt-28 md:w-full md:gap-20 lg:grid-cols-2">
			<home-stack-item
				v-for="tool in stack"
				:key="tool.name"
				:name="tool.name"
				:description="tool.description"
				:url="tool.url"
				:icon="tool.icon"
			/>
		</div>
	</home-showcase>
</template>
