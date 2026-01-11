<script setup lang="ts">
import { socials } from '~~/content/about'
</script>

<template>
	<UContainer class="group/page flex flex-col items-center h-full grow">
		<div class="flex flex-col justify-center gap-10 w-full grow slide-enter-content">
			<!-- header -->
			<div class="flex flex-col">
				<span class="text-muted text-sm">Hi, I'm</span>
				<span class="text-highlighted text-3xl -translate-x-px">
					<span>Enzo Innocenzi</span>
					<span class="inline-block text-muted -translate-x-1 translate-y-0.5">,</span>
				</span>
				<span class="mt-1 text-muted">A <span class="text-toned">software engineer</span> and <span class="text-toned">open-source contributor</span>.</span>
			</div>
			<!-- about me -->
			<div class="flex flex-col gap-y-5 slide-enter-content">
				<p>
					I got into programming when I was about 12, and I’ve been doing it professionally since I was 18. Today, I work as a <span class="text-highlighted"
					>lead software developer</span> at <ProseLink external href="https://jetfly.com" text="Jetfly" icon="brand:jetfly" />, mostly focused on internal
					tooling and general back-end work.
				</p>
				<p>
					My main stack is <span class="text-highlighted">PHP</span> and <span class="text-highlighted">TypeScript</span>, usually with <ProseLink
						external
						href="https://laravel.com"
						text="Laravel"
						icon="tabler:brand-laravel"
					/>,
					<ProseLink external href="https://hybridly.dev" text="Hybridly" icon="brand:hybridly" />, <ProseLink
						external
						href="https://vuejs.com"
						text="Vue"
						icon="tabler:brand-vue"
					/>, and <ProseLink external href="https://tailwindcss.com" text="Tailwind" icon="tabler:brand-tailwind" />. I enjoy front-end work, but I’m far more
					interested in building internal tools than public-facing sites.
				</p>
				<p>
					I’m heavily involved in <ProseLink external href="https://github.com/innocenzi" text="open-source" icon="tabler:brand-github" />. I’m a core member of
					<ProseLink external href="https://tempestphp.com" text="Tempest" icon="brand:tempest" />, a modern PHP framework, I created and maintain
					<ProseLink external href="https://hybridly.dev" text="Hybridly" icon="brand:hybridly" />, a server-driven single-page application framework on top of
					Laravel and Vue, and I regularly contribute to projects I rely on.
				</p>
				<p>
					I tend to be detail-oriented and a bit of a perfectionist. Outside of work, I usually play some video games—mostly MMOs and extraction shooters.
				</p>
			</div>
			<!-- socials -->
			<ul class="flex flex-wrap gap-4 select-none">
				<li v-for="social in socials" :key="social.label" class="size-6 shrink-0">
					<UTooltip :text="social.label === 'Email' ? `${social.handle} by email` : `${social.handle} on ${social.label}`">
						<ULink :href="social.url">
							<UIcon :name="social.icon" class="size-full" />
						</ULink>
					</UTooltip>
				</li>
			</ul>
		</div>
	</UContainer>
</template>
