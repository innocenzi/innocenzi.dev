<script setup lang="ts">
const articles = await queryContent('articles')
	.sort({ created_at: 1 })
	.find()
</script>

<template>
	<main>
		<header class="max-w-2xl">
			<h1 class="text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl sm:leading-tight md:text-4xl">
				Writing on PHP, TypeScript, Inertia, and web development in general.
			</h1>
		</header>
		<article-list
			:articles="articles"
		/>
	</main>
</template>
