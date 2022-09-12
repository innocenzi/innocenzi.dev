<script setup lang="ts">
import routes from '../data/navigation.json'

const $props = defineProps<{
	url: URL
}>()

function isCurrent(href: string) {
	return $props.url.pathname.startsWith(href)
}
</script>

<template>
	<nav class="pointer-events-auto hidden md:block">
		<ul class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
			<li v-for="route in routes" :key="route.name">
				<a
					:class="[
						'relative block px-4 py-3 transition group',
						isCurrent(route.href)
							? 'text-teal-500 dark:text-teal-400'
							: 'hover:text-teal-500 dark:hover:text-teal-400'
					]"
					:href="route.href"
					rel="prefetch"
				>
					{{ route.name }}
					<span
						class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 transition dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"
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
