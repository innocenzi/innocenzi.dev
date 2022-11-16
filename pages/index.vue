<script setup lang="ts">
import socials from '@/data/socials.json'
</script>

<template>
	<header class="max-w-2xl">
		<p class="text-4xl font-bold tracking-tight text-zinc-200 sm:text-5xl sm:leading-tight">
			Hey, I am Enzo Innocenzi. <br />
			Full-stack web developer, from France.
		</p>
	</header>

	<div class="mt-12 max-w-2xl">
		<p class="text-xl">
			I am passionate about development — <badge color="secondary">
				I love automating things
			</badge>,
			<badge color="secondary" transparent>
				modern technologies
			</badge> and <badge color="secondary" transparent>
				good developer experience
			</badge>.
		</p>
		<p class="mt-6 text-xl">
			<badge color="primary" class="md:-ml-3">
				I am a perfectionist
			</badge>.
			I pay attention to details, because I love when things look <badge color="primary" transparent>
				good
			</badge> and <badge color="primary" transparent>
				professionnal
			</badge>.
			I am also self-taught, and <a href="https://www.youtube.com/watch?v=Cv1RJTHf5fk&t=11s"><badge color="primary" transparent>I never stop learning</badge></a>.
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
				<icon :name="social.icon" class="h-6 w-6" />
			</a>
		</div>
	</div>

	<home-stack class="mt-8 md:mt-0" />
	<home-tools />
</template>
