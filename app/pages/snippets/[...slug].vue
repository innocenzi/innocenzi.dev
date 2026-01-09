<script setup lang="ts">
const route = useRoute()
const { data: snippet } = await useAsyncData(`snippet-${route.path}`, () => queryCollection('snippets').path(route.path).first())

useSeoMeta({
	title: snippet.value?.name,
	description: snippet.value?.description,
})
</script>

<template>
	<UContainer class="flex flex-col items-center gap-y-10 lg:gap-y-20 my-6 lg:my-18 h-full grow">
		<article class="flex flex-col w-full max-w-prose" v-if="snippet">
			<!-- Breadcrumbs -->
			<nav class="flex items-center gap-x-1.5 mb-6 font-medium text-muted text-sm">
				<UIcon name="tabler:code" class="mr-1 size-5" />
				<ULink to="/snippets" class="hover:text-default transition">Snippets</ULink>
				<span>/</span>
				<span class="text-primary" v-text="snippet.name" />
			</nav>
			<!-- Header -->
			<div class="flex flex-col w-full">
				<h1 class="max-w-[65ch] font-mono font-bold text-highlighted text-3xl sm:text-4xl tracking-tight" v-text="snippet.name" />
				<p class="mt-4 text-lg" v-text="snippet.description" />
			</div>
			<!-- Content -->
			<div class="space-y-12 dark:prose-invert mt-8 pb-24 w-full prose">
				<ContentRenderer :value="snippet" />
			</div>
		</article>
		<UEmpty
			v-else
			class="grow"
			variant="naked"
			icon="tabler:code-off"
			title="Not found"
			description="The code snippet you are looking for does not exist."
			:actions="[
				{
					icon: 'tabler:code',
					label: 'Browse snippets',
					color: 'neutral',
					variant: 'ghost',
					href: '/snippets',
				},
			]"
		/>
	</UContainer>
</template>
