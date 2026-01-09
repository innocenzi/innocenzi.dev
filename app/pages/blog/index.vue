<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', function() {
	return queryCollection('blog')
		.order('date', 'DESC')
		.all()
})

useSeoMeta({
	title: 'Blog — Enzo Innocenzi',
	description: 'Thoughts and writings on software development, open-source, and other things I find interesting.',
})
</script>

<template>
	<UContainer class="flex flex-col items-center gap-y-10 lg:gap-y-20 my-6 lg:my-18 h-full grow">
		<section class="flex flex-col gap-y-12">
			<!-- header -->
			<div class="flex flex-col gap-y-3">
				<span class="font-mono text-highlighted text-3xl">Blog</span>
				<p>
					Thoughts and writings on software development, open-source, and other things I find interesting.
				</p>
			</div>
			<!-- posts -->
			<div v-if="posts && posts.length > 0" class="flex flex-col gap-y-6">
				<article v-for="post in posts" :key="post.path" class="flex flex-col gap-y-2">
					<ULink :href="post.path" class="font-mono text-highlighted">
						{{ post.title }}
					</ULink>
					<p v-if="post.description" v-text="post.description" />
					<div class="flex justify-end items-center gap-x-2 text-muted text-sm">
						<time :datetime="post.date">
							{{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
						</time>
					</div>
				</article>
			</div>
			<!-- empty state -->
			<div v-else class="text-muted">
				No posts yet.
			</div>
		</section>
	</UContainer>
</template>
