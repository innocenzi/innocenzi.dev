<script setup lang="ts">
interface Project {
	icon_url: string
	repository_url: string
	documentation_url: string
	title: string
	description: string
	created_at: string
}

defineProps<{
	projects: Project[]
}>()

function sortByCreationDate(projects: Project[]) {
	return projects.sort((a, b) => {
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	})
}
</script>

<template>
	<div class="mt-16 sm:mt-20">
		<ul role="list" class="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
			<li v-for="project in sortByCreationDate(projects)" :key="project.title" class="group relative flex flex-col items-start">
				<div class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800 p-1.5 shadow-md ring-0">
					<img
						:alt="`Icon for the ${project.title} project`"
						:src="project.icon_url"
						class="h-full w-full"
					/>
				</div>
				<h2 class="mt-6 text-base font-semibold text-zinc-100">
					<a class="relative z-10 decoration-dotted hover:underline" :href="project.repository_url" v-text="project.title" />
				</h2>
				<p class="relative z-10 mt-2 text-sm text-zinc-400">
					{{ project.description }}
				</p>
				<span class="grow" />
				<div class="mt-6 flex items-center gap-x-4">
					<a :href="project.repository_url" class="text-zinc-500 transition hover:text-zinc-300" title="Repository">
						<icon name="mdi:github" class="h-6 w-6" />
					</a>
					<a :href="project.documentation_url" class="text-zinc-500 transition hover:text-zinc-300" title="Documentation">
						<icon name="mdi:document" class="h-6 w-6" />
					</a>
				</div>
			</li>
		</ul>
	</div>
</template>
