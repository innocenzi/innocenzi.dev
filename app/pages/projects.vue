<script setup lang="ts">
import type { Activity } from '~/components/contribution-graph/use-contribution-graph'
import { projects } from '~~/content/about'

interface GitHubContributionsResponse {
	contributions: Activity[]
}

const { data: github, pending } = await useFetch<GitHubContributionsResponse>('https://github-contributions-api.jogruber.de/v4/innocenzi?y=last')
const featured = projects.filter((project) => project.featured === true)
const others = projects
	.filter((project) => !project.featured)
	.sort((a, b) => Number(a.deprecated ?? false) - Number(b.deprecated ?? false))

useSeoMeta({
	title: 'Projects — Enzo Innocenzi',
	description: 'I’m quite involved in open-source. Here are some of the projects I am currently working on and others I have worked on in the past.',
})
</script>

<template>
	<UContainer class="flex flex-col items-center h-full grow">
		<!-- projects -->
		<section class="flex flex-col gap-y-8 mt-8 lg:mt-20">
			<!-- header -->
			<div class="flex flex-col gap-y-4">
				<span class="font-mono text-highlighted text-3xl">Current</span>
				<p>
					I’m quite involved in <ProseLink external href="https://github.com/innocenzi" text="open-source" icon="tabler:brand-github" />. Below are the projects
					I am currently working on during my free time.
				</p>
			</div>
			<!-- featured projects -->
			<ul class="flex flex-col gap-y-8">
				<li v-for="project in featured" :key="project.label" class="flex md:flex-row flex-col gap-x-3 gap-y-3">
					<!-- icon -->
					<div class="bg-elevated/50 p-1 border border-default rounded-full size-10 md:size-7 translate-y-px shrink-0">
						<img :src="project.iconUrl" v-if="project.iconUrl" class="size-full" />
						<UIcon :name="project.icon" v-else-if="project.icon" class="size-full" />
					</div>
					<!-- content -->
					<div class="flex flex-col gap-y-3">
						<!-- title and description -->
						<div class="flex flex-col">
							<div class="flex items-center md:h-7">
								<ULink :href="project.repository" class="text-highlighted text-base" v-text="project.label" />
							</div>
							<span v-text="project.description" />
						</div>
						<!-- links -->
						<ul class="flex gap-x-1.5">
							<!-- Website -->
							<li class="size-5" v-if="project.site">
								<UTooltip text="Website">
									<ULink :href="project.site">
										<UIcon name="tabler:link" class="size-full" />
									</ULink>
								</UTooltip>
							</li>
							<!-- Repository -->
							<li class="size-5" v-if="project.repository">
								<UTooltip text="GitHub repository">
									<ULink :href="project.repository">
										<UIcon name="tabler:brand-github" class="size-full" />
									</ULink>
								</UTooltip>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</section>
		<!-- other projects -->
		<section class="flex flex-col gap-y-8 mt-20 max-w-full md:max-w-[unset]">
			<!-- header -->
			<div class="flex flex-col gap-y-4">
				<span class="font-mono text-highlighted text-3xl">Projects</span>
				<p>
					Here are some projects I have worked on. They aren't projects I'm particularly proud of—just some things I happened to create or contribute to along
					the way.
				</p>
			</div>
			<!-- contribution graph -->
			<div class="flex flex-col items-center md:overflow-visible overflow-x-scroll" v-if="pending || github">
				<ClientOnly>
					<div v-if="pending">
						<UIcon name="tabler:loader-2" class="animate-spin" />
					</div>
					<ContributionGraph v-else-if="github" :data="github.contributions" :block-size="10" :block-margin="3.4" :block-radius="3" :font-size="12">
						<ContributionGraphCalendar>
							<template #default="{ activity, dayIndex, weekIndex }">
								<UTooltip :text="`${activity.count} contributions on ${activity.date}`">
									<g>
										<ContributionGraphBlock :activity :day-index="dayIndex" :week-index="weekIndex" />
									</g>
								</UTooltip>
							</template>
						</ContributionGraphCalendar>
					</ContributionGraph>
				</ClientOnly>
			</div>
			<!-- other projects -->
			<ul class="gap-4 grid grid-cols-1 md:grid-cols-2">
				<li v-for="project in others" :key="project.label" class="bg-elevated/30 p-0.5 border border-default/50 rounded-md text-sm">
					<div class="flex flex-col justify-between gap-y-4 p-3 border border-default border-dashed rounded-md h-full">
						<!-- title and description -->
						<div class="flex flex-col gap-y-1">
							<span class="text-highlighted text-base" v-text="project.label" />
							<UTooltip :text="project.description">
								<span class="line-clamp-3" v-text="project.description" />
							</UTooltip>
						</div>
						<!-- footer -->
						<div class="flex md:flex-row flex-row-reverse justify-between items-center gap-x-2">
							<!-- links -->
							<ul class="flex gap-x-2 md:gap-x-1.5">
								<!-- Website -->
								<li class="size-5" v-if="project.site">
									<UTooltip text="Website">
										<ULink :href="project.site">
											<UIcon name="tabler:external-link" class="size-full" />
										</ULink>
									</UTooltip>
								</li>
								<!-- Repository -->
								<li class="size-5" v-if="project.repository">
									<UTooltip text="GitHub repository">
										<ULink :href="project.repository">
											<UIcon name="tabler:brand-github" class="size-full" />
										</ULink>
									</UTooltip>
								</li>
							</ul>
							<!-- badges -->
							<ul class="flex gap-x-2 md:gap-x-1.5">
								<!-- Core maintainer -->
								<UTooltip text="I am a core maintainer of this project">
									<UBadge as="li" v-if="project.role === 'core-maintainer'" label="Core maintainer" color="success" class="uppercase" />
								</UTooltip>
								<!-- Co-maintainer -->
								<UTooltip text="I help maintain this project">
									<UBadge as="li" v-if="project.role === 'co-maintainer'" label="Co-maintainer" color="info" class="uppercase" />
								</UTooltip>
								<!-- Deprecated -->
								<UTooltip text="This project is no longer maintained">
									<UBadge as="li" v-if="project.deprecated" label="Deprecated" color="error" class="uppercase" />
								</UTooltip>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</section>
	</UContainer>
</template>
