<script setup lang="ts">
import background from '@/assets/background.webp'
import pattern from '@/assets/pattern.svg'

const route = useRoute()
const config = useRuntimeConfig()

useHead({
	htmlAttrs: { class: 'bg-[#040404]' },
	bodyAttrs: { class: 'flex flex-col text-zinc-400' },
	link: [
		{ rel: 'canonical', href: config.domain + route.fullPath },
	],
})
</script>

<template>
	<div class="relative flex flex-1 flex-col">
		<div
			class="pointer-events-none absolute inset-0 flex justify-center bg-repeat"
			:style="`background-image: url(${pattern})`"
		>
			<div
				class="w-full bg-cover bg-no-repeat opacity-40"
				:style="`background-image: url(${background})`"
			/>
		</div>
		<main class="container mx-auto flex max-w-6xl flex-1 flex-col px-6 sm:px-12">
			<layout-header />

			<section class="mt-8 mb-16 flex flex-1 flex-col md:mt-32">
				<slot />
			</section>

			<div class="group my-12 flex flex-col items-center justify-center">
				<span class="inline-flex items-center text-sm">
					Made with <icon name="heroicons:heart-20-solid" class="mx-2 h-5 w-5 translate-y-[1px] text-pink-200/90 transition duration-300 group-hover:text-red-300" />
					by &nbsp;
					<a class="link" href="https://twitter.com/enzoinnocenzi">Enzo Innocenzi</a></span>
			</div>
		</main>
	</div>
</template>

<style>
:root {
	tab-size: 4;
	@apply selection:bg-pink-200/10 selection:text-pink-200/90;
}

html {
	height: 100%;
}

body {
	min-height: 100%;
	overflow-y: scroll;
	@apply flex-1;
}

#__nuxt {
	@apply flex flex-col flex-1;
}

a.link {
	border-bottom-width: 0;
	background-image: linear-gradient(transparent, transparent), linear-gradient(theme('colors.pink.200'), theme('colors.pink.200'));
	background-size: 0 1px;
	background-position: 0 100%;
	background-repeat: no-repeat;
	transition: background-size .3s ease-in-out;
}

a.link:hover {
	background-size: 100% 1px;
}
</style>
