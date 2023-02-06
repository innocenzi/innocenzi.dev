<script setup lang="ts">
defineProps<{
	title: string[]
	readingTime: string
	creationDate: string
}>()
</script>

<template>
	<div class="h-full w-full">
		<svg
			class="absolute inset-0 z-20 h-full w-full"
			width="2258"
			height="1185"
			viewBox="0 0 2258 1185"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clip-path="url(#clip0_5_3)">
				<rect width="2258" height="1185" fill="#090909" />
				<g filter="url(#filter0_f_5_3)">
					<rect x="-1069" y="-131" width="2227" height="2540" fill="url(#paint0_diamond_5_3)" />
				</g>
				<g filter="url(#filter1_f_5_3)">
					<rect x="1316" y="-644" width="1686" height="1594" fill="url(#paint1_radial_5_3)" />
				</g>
			</g>
			<defs>
				<filter
					id="filter0_f_5_3"
					x="-1073"
					y="-135"
					width="2235"
					height="2548"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_5_3" />
				</filter>
				<filter
					id="filter1_f_5_3"
					x="816"
					y="-1144"
					width="2686"
					height="2594"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_5_3" />
				</filter>
				<radialGradient
					id="paint0_diamond_5_3"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(44.5 1139) rotate(90) scale(1270 1113.5)"
				>
					<stop stop-color="#4A3048" />
					<stop offset="1" stop-color="#1A202C" stop-opacity="0" />
				</radialGradient>
				<radialGradient
					id="paint1_radial_5_3"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(2159 153) rotate(58.7807) scale(764.645 740.796)"
				>
					<stop stop-color="#202D5B" />
					<stop offset="1" stop-color="#1A202C" stop-opacity="0" />
				</radialGradient>
				<clipPath id="clip0_5_3">
					<rect width="2258" height="1185" fill="white" />
				</clipPath>
			</defs>
		</svg>
		<div class="relative inset-0 z-50 flex h-full w-full items-center justify-center text-white">
			<div class="flex w-[70%] flex-col">
				<span class="mb-4 inline-flex items-center gap-x-5 text-2xl font-medium leading-none tracking-wide text-pink-200/70">
					<span v-text="creationDate" />
					<span class="mb-1 text-xs opacity-50">•</span>
					<span v-text="readingTime" />
				</span>
				<span class="text-5xl font-bold uppercase text-purple-100">{{ title[0] }}</span>
				<span class="bg-gradient-to-tr from-pink-300 to-purple-400 bg-clip-text text-5xl font-bold uppercase text-transparent">{{ title[1] }}</span>
			</div>
		</div>
	</div>
</template>
