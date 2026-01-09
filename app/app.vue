<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const items = computed<NavigationMenuItem[]>(() => [
	{
		label: 'About',
		to: '/',
		active: route.path === '/',
	},
	{
		label: 'Blog',
		to: '/blog',
		active: route.path.startsWith('/blog'),
	},
	{
		label: 'Projects',
		to: '/projects',
		active: route.path.startsWith('/projects'),
	},
	{
		label: 'Uses',
		to: '/uses',
		active: route.path.startsWith('/uses'),
	},
])

useSeoMeta({
	title: 'Enzo Innocenzi — Software engineer',
	description: 'Hey, I am Enzo Innocenzi. I am software engineer and open-source contributor, currently working as a full-stack web developer.',
})
</script>

<template>
	<UApp>
		<UHeader :toggle="false">
			<template #left>
				<ULink to="/">
					<Signature class="h-8 text-highlighted" />
				</ULink>
			</template>
			<template #right>
				<div class="flex gap-x-5 lowercase">
					<ULink v-for="link in items" :key="link.label" :href="link.to" class="text-sm" prefetch :class="link.active ? 'text-primary' : ''">{{
						link.label
					}}</ULink>
				</div>
			</template>
		</UHeader>
		<UMain class="z-1 isolate flex flex-col min-h-auto grow">
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</UMain>
	</UApp>
</template>
