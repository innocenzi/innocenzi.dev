<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import routes from '@/data/navigation.json'

const $route = useRoute()

// TODO
function isCurrent(href: string) {
	const current = $route.path.trim()

	if (href === '/') {
		return href === current
	}

	return current.startsWith(href)
}
</script>

<template>
	<div>
		<nav v-if="routes.length" class="pointer-events-auto hidden md:block">
			<ul class="flex rounded-full bg-zinc-900 px-3 text-sm font-medium text-zinc-200 shadow-lg shadow-zinc-800/5 ring-1 ring-white/10 backdrop-blur">
				<li v-for="route in routes" :key="route.name">
					<nuxt-link
						:class="[
							'relative block px-4 py-3 transition group',
							isCurrent(route.href)
								? 'text-pink-200'
								: 'hover:text-pink-200/90'
						]"
						:href="route.href"
						:aria-label="route.name"
						:external="route.external"
						rel="prefetch"
					>
						<span v-text="route.name" />
						<span
							class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-pink-300/0 via-pink-300/40 to-pink-300/0 transition"
							:class="[
								isCurrent(route.href)
									? 'opacity-100'
									: 'opacity-0 group-hover:opacity-50'
							]"
						/>
					</nuxt-link>
				</li>
			</ul>
		</nav>

		<Popover v-slot="{ open }" class="pointer-events-auto relative md:hidden">
			<PopoverButton class="group flex items-center rounded-3xl bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-200 shadow-lg shadow-zinc-800/5 ring-1 ring-white/10 backdrop-blur hover:ring-white/20 focus:outline-none">
				Menu
				<icon name="heroicons-solid:chevron-down" class="ml-2 h-4 w-4 text-zinc-500 transition duration-300" :class="{ 'rotate-180': open }" />
			</PopoverButton>

			<transition
				enter-active-class="transition origin-top-right duration-150 ease-out"
				enter-from-class="scale-95 opacity-0"
				enter-to-class="scale-100 opacity-100"
				leave-active-class="transition origin-top-right duration-100 ease-in"
				leave-from-class="scale-100 opacity-100"
				leave-to-class="scale-95 opacity-0"
			>
				<PopoverPanel v-slot="{ close }" class="fixed inset-x-4 top-24 z-50 rounded-3xl bg-zinc-900 p-6 ring-1 ring-zinc-800">
					<div class="-mt-2 flex flex-row-reverse items-center justify-between">
						<button aria-label="Close menu" type="button" @click="close">
							<icon name="heroicons-solid:x" />
						</button>
						<h2 class="text-sm font-medium text-zinc-400">
							Navigation
						</h2>
					</div>
					<nav class="mt-6">
						<ul class="-my-2 divide-y divide-zinc-100/5 text-base text-zinc-300">
							<template v-for="route in routes" :key="route.name">
								<li v-if="!route.hidden">
									<nuxt-link
										class="block py-2"
										:href="route.href"
										:class="{
											'text-pink-200': isCurrent(route.href)
										}"
										:external="route.external"
										v-text="route.name"
									/>
								</li>
							</template>
						</ul>
					</nav>
				</PopoverPanel>
			</transition>
		</Popover>
	</div>
</template>
