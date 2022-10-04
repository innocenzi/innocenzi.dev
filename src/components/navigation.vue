<script setup lang="ts">
import routes from '../data/navigation.json'

const $props = defineProps<{
	url: URL
}>()

const displayedRoutes = routes.filter(({ hidden }) => !hidden)

function isCurrent(href: string) {
	const current = $props.url.pathname.trim()

	if (href === '/') {
		return href === current
	}

	return current.startsWith(href)
}
</script>

<template>
	<nav v-if="displayedRoutes.length" class="pointer-events-auto hidden md:block">
		<ul class="flex rounded-full bg-zinc-800/90 px-3 text-sm font-medium text-zinc-200 shadow-lg shadow-zinc-800/5 ring-1 ring-white/10 backdrop-blur">
			<li v-for="route in displayedRoutes" :key="route.name">
				<a
					:class="[
						'relative block px-4 py-3 transition group',
						isCurrent(route.href)
							? 'text-pink-300'
							: 'hover:text-pink-300'
					]"
					:href="route.href"
					rel="prefetch"
				>
					{{ route.name }}
					<span
						class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-pink-300/0 via-pink-300/40 to-pink-300/0 transition"
						:class="[
							isCurrent(route.href)
								? 'opacity-100'
								: 'opacity-0 group-hover:opacity-40'
						]"
					/>
				</a>
			</li>
		</ul>
	</nav>
</template>
