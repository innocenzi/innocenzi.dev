<script setup lang="ts">
import projects from '@/data/projects.json'

const description = 'I am not very creative, and my side projects rarely get finished, let alone polished — but I am proud of the ones listed here.'

useHead({
	title: 'Projects',
	meta: [
		{ name: 'description', content: description },
	],
})

definePageMeta({
	changefreq: 'monthly',
})
</script>

<template>
	<main>
		<header class="max-w-2xl">
			<h1 class="text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl sm:leading-tight md:text-4xl">
				I've made a few things.
			</h1>
			<p class="mt-4" v-text="description" />
		</header>
		<project-list :projects="projects" />
	</main>
</template>
