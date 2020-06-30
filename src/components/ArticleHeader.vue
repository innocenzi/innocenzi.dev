<template>
	<div>
		<!-- Metadata -->
		<div class="mb-4 font-mono text-lg">
			<span class="text-metadata" v-for="tag in article.tags" :key="tag.id">
				<!-- TODO: tag page -->
				<span>{{ tag.title }}</span>
				<span class="mx-4 opacity-25 text-metadata-muted">•</span>
			</span>
			<span class="text-metadata-muted">{{ getReadableReadTime(article) }}</span>
		</div>

		<!-- Title -->
		<g-link
			class="flex items-center justify-between mb-4 text-4xl group hover:text-brand focus:underline focus:shadow-none"
			:to="article.path"
			v-if="displayTitle"
		>
			<h1>{{ article.title }}</h1>
			<span class="hidden px-3 py-1 text-lg rounded-full bg-icon group-hover:block">Read</span>
		</g-link>

		<!-- Other content -->
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		article: Object,
		displayTitle: {
			type: Boolean,
			default: true,
		},
	},
	methods: {
		getReadableReadTime({ timeToRead }) {
			return `${timeToRead.toString().padStart(2, '0')} minute${timeToRead > 1 ? 's' : ''} read`;
		},
	},
};
</script>
