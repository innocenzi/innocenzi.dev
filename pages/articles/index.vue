<script setup lang="ts">
const articles = await queryContent('articles')
	.sort({ created_at: 1 })
	.find()

useHead({
	title: 'Articles',
	meta: [
		{ name: 'description', content: 'Writing on PHP, TypeScript, Inertia, and web development in general.' },
	],
})

definePageMeta({
	changefreq: 'daily',
})
</script>

<template>
	<main>
		<header class="max-w-2xl">
			<h1 class="text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl sm:leading-tight md:text-4xl md:leading-tight">
				Writing on PHP, TypeScript, Inertia, and web development in general.
			</h1>
			<p class="mt-4">
				Whenever I feel like writing down something I've learnt, I do it here.
			</p>
		</header>
		<article-list
			:articles="articles"
		/>
	</main>
</template>
