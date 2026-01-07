<script setup lang="ts">
import { Motion } from 'motion-v'

const duration = 2.5
const paths = [
	'M492.961,504.077C512.296,528.499 590.697,646.946 757.926,689.034C991.549,747.833 1084.348,589.633 930.325,528.536C754.396,458.749 396.082,605.28 569.043,823.036C729.722,1025.328 1345.685,1066.752 1172.332,472.607',
	'M1062.961,278.077C1054.618,331.901 1150.173,355.05 1169.8,280.56C1181.537,236.011 1109.552,195.938 1079.145,212.568C1029.943,239.478 1069.926,290.324 1074.037,295.553',
]
</script>

<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="452 155 954 871">
		<Motion
			v-for="(path, index) in paths"
			:key="path"
			as="path"
			:d="path"
			fill="none"
			stroke="currentColor"
			stroke-width="50"
			stroke-linecap="butt"
			stroke-linejoin="miter"
			:initial="{ pathLength: 0 }"
			:animate="{ pathLength: 1 }"
			:transition="{ duration, delay: index * duration, ease: 'easeOut' }"
		/>
	</svg>
</template>
