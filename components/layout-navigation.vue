<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel, PopoverOverlay } from '@headlessui/vue'
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
	<div class="flex items-center">
		<nav v-if="routes.length" class="pointer-events-auto hidden md:block">
			<ul class="flex text-sm font-medium tracking-wide text-zinc-500 backdrop-blur">
				<li v-for="route in routes" :key="route.name">
					<nuxt-link
						:class="[
							'relative block px-4 py-2 transition group',
							isCurrent(route.href)
								? 'text-zinc-300'
								: 'hover:text-zinc-300'
						]"
						:href="route.href"
						:aria-label="route.name"
						:external="route.external"
						rel="prefetch"
					>
						<span v-text="route.name" />
					</nuxt-link>
				</li>
			</ul>
		</nav>

		<Popover v-slot="{ open }" class="pointer-events-auto relative md:hidden">
			<PopoverButton class="group flex items-center px-5 py-2 text-sm font-medium text-zinc-300 focus:outline-none">
				Menu
				<icon name="heroicons-solid:chevron-down" class="ml-2 h-4 w-4 text-zinc-500 transition duration-300" :class="{ 'rotate-180': open }" />
			</PopoverButton>

			<transition
				enter-active-class="transition duration-150 ease-out"
				enter-from-class="opacity-0"
				enter-to-class="opacity-100"
				leave-active-class="transition duration-100 ease-in"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<PopoverOverlay class="fixed inset-0 z-40 bg-black/40 backdrop-blur" />
			</transition>

			<transition
				enter-active-class="transition origin-top-right duration-150 ease-out"
				enter-from-class="scale-95 opacity-0"
				enter-to-class="scale-100 opacity-100"
				leave-active-class="transition origin-top-right duration-100 ease-in"
				leave-from-class="scale-100 opacity-100"
				leave-to-class="scale-95 opacity-0"
			>
				<PopoverPanel v-slot="{ close }" class="fixed inset-x-4 top-20 z-50 rounded-xl bg-zinc-900 p-4 ring-1 ring-zinc-800">
					<div class="flex flex-row-reverse items-center justify-between">
						<button aria-label="Close menu" type="button" @click="close">
							<icon name="heroicons-solid:x" />
						</button>
						<h2 class="text-sm tracking-wider text-zinc-600">
							Navigation
						</h2>
					</div>
					<nav class="mt-4">
						<ul class="-my-2 divide-y divide-zinc-100/5 text-base text-zinc-400">
							<template v-for="route in routes" :key="route.name">
								<li v-if="!route.hidden">
									<nuxt-link
										class="block py-2"
										:href="route.href"
										:class="{
											'text-zinc-200': isCurrent(route.href)
										}"
										:external="route.external"
										@click="close"
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
