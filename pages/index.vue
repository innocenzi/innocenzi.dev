<script setup lang="ts">
import socials from '@/data/socials.json'

useHead({
	title: 'Enzo Innocenzi',
	titleTemplate: '%s - Software developer',
	meta: [
		{ name: 'description', content: 'Hey, I am Enzo Innocenzi. Full-stack web developer, from France.' },
	],
})

definePageMeta({
	changefreq: 'monthly',
})
</script>

<template>
	<main>
		<!-- eslint-disable vue/singleline-html-element-content-newline -->
		<header class="max-w-2xl">
			<p class="text-4xl font-bold tracking-tight text-zinc-200 sm:text-5xl sm:leading-tight">
				Hey, I am Enzo Innocenzi. <br />
				Full-stack web developer, from France.
			</p>
		</header>
		<div class="mt-12 max-w-2xl">
			<p class="text-xl">
				I am passionate about development — <badge color="secondary" transparent text="I love automating things" />,
				<badge color="secondary" text="modern technologies" transparent /> and <badge color="secondary" text="good developer experience" transparent />.
			</p>
			<p class="mt-6 text-xl">
				<badge color="primary" transparent text="I am a perfectionist" />.
				I pay attention to details, because I love when things look <badge color="primary" transparent text="good" /> and <badge color="primary" transparent text="professional" />.
				I am also self-taught, and <a href="https://www.youtube.com/watch?v=Cv1RJTHf5fk&t=11s"><badge color="primary" text="I never stop learning" transparent /></a>.
			</p>
			<div class="mt-8 flex gap-6">
				<a
					v-for="social in socials"
					:key="social.title"
					:href="social.url"
					:title="social.title"
					class="text-zinc-500 transition hover:text-zinc-200"
					rel="me nofollow noopener"
					target="_blank"
				>
					<Icon :name="social.icon" class="size-6" />
				</a>
			</div>
		</div>
		<home-stack class="mt-8 md:mt-0" />
		<home-tools />
	</main>
</template>
