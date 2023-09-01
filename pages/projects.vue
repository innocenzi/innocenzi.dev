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
		<!-- Main projects -->
		<header class="max-w-2xl">
			<h1 class="text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl sm:leading-tight md:text-4xl">
				I've made a few things.
			</h1>
			<p class="mt-4" v-text="description" />
		</header>
		<project-list class="mt-16 sm:mt-20" :projects="projects" :main="true" />
		<!-- Other projects -->
		<div class="max-w-2xl mt-20 sm:mt-32">
			<h2 class="text-xl font-bold tracking-tight text-zinc-100 sm:text-5xl sm:leading-tight md:text-2xl">
				Other notable projects
			</h2>
			<p class="mt-2">
				These are smaller-scope projects that may be worth mentioning.
			</p>
		</div>
		<project-list class="mt-10 sm:mt-6" :projects="projects" :main="false" />
	</main>
</template>
