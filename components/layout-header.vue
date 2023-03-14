<script setup lang="ts">
</script>

<template>
	<header class="mt-8 flex w-full justify-between md:mt-20">
		<div class="h-11 w-11 shrink-0 rounded-full bg-zinc-800/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-white/10 backdrop-blur focus-within:ring focus-within:ring-pink-300">
			<nuxt-link href="/" class="pointer-events-auto focus:outline-none" aria-label="Home" rel="prefetch">
				<img
					src="@/assets/avatar.webp"
					quality="80"
					alt="Enzo Innocenzi"
					width="100"
					height="100"
					class="aspect-square rounded-full bg-zinc-800 object-cover"
				/>
			</nuxt-link>
		</div>
		<layout-navigation />
	</header>
</template>
