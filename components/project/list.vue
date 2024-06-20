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
	<ul role="list" class="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3">
		<li
			v-for="project in projects"
			:key="project.title"
			class="group relative flex flex-col items-start"
		>
			<!-- Icon -->
			<div v-if="project.icon_url" class="relative z-10 flex size-12 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800 p-1.5 shadow-md ring-0">
				<img
					:alt="`Icon for the ${project.title} project`"
					:src="project.icon_url"
					class="size-full"
				/>
			</div>
			<a :href="project.repository_url" class="group -mx-4 -my-1 mt-0.5 rounded-md px-4 py-2 transition hover:bg-zinc-800/20 sm:-my-3 sm:mt-4 sm:py-3">
				<!-- Project name -->
				<div class="flex items-center justify-between">
					<h2 class="text-base font-semibold text-zinc-200 transition group-hover:text-zinc-100" v-text="project.title" />
					<project-badge v-if="project.deprecated" type="warning" text="deprecated" />
					<project-badge v-if="isProjectRecent(project)" type="success" text="new" />
				</div>
				<!-- Description -->
				<p class="relative z-10 mt-2 text-sm text-zinc-400 transition-colors group-hover:text-zinc-200" v-text="project.description" />
				<span class="grow" />
				<!-- Links -->
				<div
					class="-ml-0.5 flex gap-x-4 gap-y-1 sm:items-center sm:gap-x-2"
					:class="{
						'mt-3 sm:mt-6': project.main,
						'mt-3 sm:mt-3': !project.main,
					}"
				>
					<a
						:href="project.repository_url"
						class="flex items-center text-zinc-500 transition hover:text-zinc-300"
						title="Repository"
						@click.stop
					>
						<Icon name="mdi:github" class="size-6" />
						<span class="ml-1.5 text-sm sm:hidden">GitHub</span>
					</a>
					<a
						v-if="project.documentation_url"
						:href="project.documentation_url"
						class="flex items-center text-zinc-500 transition hover:text-zinc-300"
						title="Documentation"
						@click.stop
					>
						<Icon name="mdi:document" class="size-6" />
						<span class="ml-1.5 text-sm sm:hidden">Documentation</span>
					</a>
					<a
						v-if="project.site_url"
						:href="project.site_url"
						class="flex items-center text-zinc-500 transition hover:text-zinc-300"
						title="Website"
						@click.stop
					>
						<Icon name="mdi:web" class="size-6" />
						<span class="ml-1.5 text-sm sm:hidden">Website</span>
					</a>
				</div>
			</a>
		</li>
	</ul>
</template>
