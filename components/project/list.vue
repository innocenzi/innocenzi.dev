<script setup lang="ts">
interface Project {
	main: boolean
	deprecated?: boolean
	icon_url?: string
	repository_url: string
	documentation_url?: string
	site_url?: string
	title: string
	description: string
	created_at: string
}

const $props = defineProps<{
	projects: Project[]
	main: boolean
}>()

const projects = computed(() => {
	return $props.projects
		.slice()
		.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
		.filter((project) => project.main === $props.main)
})

function isProjectRecent(project: Project) {
	const days = 30
	return new Date(project.created_at).getTime() > new Date().getTime() - (1000 * 60 * 60 * 24 * days)
}
</script>

<template>
	<ul role="list" class="grid grid-cols-1 gap-x-12 gap-y-8 sm:gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
		<li
			v-for="project in projects"
			:key="project.title"
			class="group relative flex flex-col items-start"
		>
			<!-- Icon -->
			<div v-if="project.icon_url" class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800 p-1.5 shadow-md ring-0">
				<img
					:alt="`Icon for the ${project.title} project`"
					:src="project.icon_url"
					class="h-full w-full"
				/>
			</div>
			<a :href="project.repository_url" class="hover:bg-zinc-800/20 transition mt-0.5 sm:mt-4 px-4 py-2 sm:py-3 -mx-4 -my-1 sm:-my-3 rounded-md group">
				<!-- Project name -->
				<div class="flex items-center justify-between">
					<h2 class="text-base font-semibold text-zinc-200 group-hover:text-zinc-100 transition" v-text="project.title" />
					<project-badge v-if="project.deprecated" type="warning" text="deprecated" />
					<project-badge v-if="isProjectRecent(project)" type="success" text="new" />
				</div>
				<!-- Description -->
				<p class="relative z-10 mt-2 text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors" v-text="project.description" />
				<span class="grow" />
				<!-- Links -->
				<div
					class="flex sm:items-center gap-x-4 sm:gap-x-2 gap-y-1 -ml-0.5"
					:class="{
						'mt-3 sm:mt-6': project.main,
						'mt-3 sm:mt-3': !project.main,
					}"
				>
					<a :href="project.repository_url" class="flex items-center text-zinc-500 transition hover:text-zinc-300" title="Repository" @click.stop>
						<icon name="mdi:github" class="h-6 w-6" />
						<span class="sm:hidden ml-1.5 text-sm">GitHub</span>
					</a>
					<a v-if="project.documentation_url" :href="project.documentation_url" class="flex items-center text-zinc-500 transition hover:text-zinc-300" title="Documentation" @click.stop>
						<icon name="mdi:document" class="h-6 w-6" />
						<span class="sm:hidden ml-1.5 text-sm">Documentation</span>
					</a>
					<a v-if="project.site_url" :href="project.site_url" class="flex items-center text-zinc-500 transition hover:text-zinc-300" title="Website" @click.stop>
						<icon name="mdi:web" class="h-6 w-6" />
						<span class="sm:hidden ml-1.5 text-sm">Website</span>
					</a>
				</div>
			</a>
		</li>
	</ul>
</template>
