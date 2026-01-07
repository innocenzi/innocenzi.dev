<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(`blog-post-${route.path}`, () => queryCollection('blog').path(route.path).first())

if (!post.value) {
	throw createError({
		statusCode: 404,
		statusMessage: 'Post not found',
	})
}

useSeoMeta({
	title: post.value.title,
	description: post.value.description,
})
</script>

<template>
	<UContainer class="flex flex-col items-center h-full grow">
		<article class="flex flex-col mt-8 lg:mt-20 w-full max-w-prose" v-if="post">
			<!-- Breadcrumbs -->
			<nav class="flex items-center gap-x-1.5 mb-6 font-medium text-muted text-sm">
				<UIcon name="tabler:news" class="mr-1 size-5 translate-y-px" />
				<ULink to="/blog" class="hover:text-default transition">Blog</ULink>
				<span>/</span>
				<span class="text-primary" v-text="post.title" />
			</nav>
			<!-- Header -->
			<div class="flex flex-col pb-6 w-full">
				<h1 class="max-w-[65ch] font-mono font-bold text-highlighted text-3xl sm:text-4xl tracking-tight" v-text="post.title" />
				<p class="mt-4 text-lg" v-text="post.description" />
			</div>
			<div class="pb-2 border-default border-b">
				<span class="mt-4 text-muted text-sm">
					written on <time
						class="text-toned"
						:datetime="post.date"
						v-text="new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })"
					/>
				</span>
			</div>
			<!-- Content -->
			<div class="space-y-12 dark:prose-invert mt-8 pb-24 w-full prose">
				<ContentRenderer :value="post" />
			</div>
		</article>
	</UContainer>
</template>
