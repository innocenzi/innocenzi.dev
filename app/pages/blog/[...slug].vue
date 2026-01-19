<script setup lang="ts">
const route = useRoute()
const { data: post, pending } = await useAsyncData(`blog-post-${route.path}`, () => queryCollection('blog').path(route.path.replace(/\/$/, '')).first())

useSeoMeta({
	title: post.value?.title,
	description: post.value?.description,
})
</script>

<template>
	<UContainer class="flex flex-col items-center gap-y-10 lg:gap-y-20 my-6 lg:my-18 h-full grow">
		<article class="flex flex-col w-full max-w-prose" v-if="post">
			<!-- Breadcrumbs -->
			<nav class="flex items-center gap-x-1.5 mb-6 font-medium text-muted text-sm">
				<UIcon name="tabler:news" class="mr-1 size-5" />
				<ULink to="/blog" class="hover:text-default transition">Blog</ULink>
				<span>/</span>
				<span class="text-primary" v-text="post.title" />
			</nav>
			<!-- Header -->
			<div class="flex flex-col pb-6 w-full">
				<h1 class="max-w-prose font-mono font-bold text-highlighted text-3xl sm:text-4xl tracking-tight" v-text="post.title" />
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
				<ContentRenderer :value="post" class="slide-enter-content" />
			</div>
		</article>
		<div v-else-if="pending" class="flex justify-center items-center grow">
			<UIcon name="tabler:loader-2" class="text-muted animate-spin" />
		</div>
		<UEmpty
			v-else
			class="grow"
			variant="naked"
			icon="tabler:news-off"
			title="Not found"
			description="The blog article you are looking for does not exist."
			:actions="[
				{
					icon: 'tabler:news',
					label: 'Browse blog posts',
					color: 'neutral',
					variant: 'ghost',
					href: '/blog',
				},
			]"
		/>
	</UContainer>
</template>
