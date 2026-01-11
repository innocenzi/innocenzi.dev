<script setup lang="ts">
const { data: snippets } = await useAsyncData('snippets', function() {
	return queryCollection('snippets')
		.order('name', 'ASC')
		.all()
})

useSeoMeta({
	title: 'Snippets — Enzo Innocenzi',
	description: 'A collection of code snippets and quick reference that I occasionally reuse.',
})
</script>

<template>
	<UContainer class="flex flex-col items-center gap-y-10 lg:gap-y-20 my-6 lg:my-18 h-full grow">
		<section class="flex flex-col gap-y-12 slide-enter-content">
			<!-- header -->
			<div class="flex flex-col gap-y-3">
				<span class="font-mono text-highlighted text-3xl">Snippets</span>
				<p>
					A collection of code snippets and quick references that I occasionally reuse. This is mostly for myself, but maybe you will find something useful.
				</p>
			</div>
			<!-- snippets -->
			<div v-if="snippets && snippets.length > 0" class="flex flex-col gap-y-6 slide-enter-content">
				<article v-for="snippet in snippets" :key="snippet.path" class="flex flex-col gap-y-2">
					<!-- snippet name -->
					<ULink :href="snippet.path" class="font-mono text-highlighted">
						{{ snippet.name }}
					</ULink>
					<!-- description -->
					<p v-if="snippet.description" v-text="snippet.description" />
					<!-- tags -->
					<div v-if="snippet.tags && snippet.tags.length > 0" class="flex items-center gap-x-2 mt-1 uppercase">
						<UBadge v-for="tag in snippet.tags" :key="tag" color="neutral" variant="soft" :label="tag" />
					</div>
				</article>
			</div>
			<!-- empty state -->
			<div v-else class="text-muted">
				No snippets yet.
			</div>
		</section>
	</UContainer>
</template>
