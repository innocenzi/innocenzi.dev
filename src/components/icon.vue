<script setup lang="ts">
import github from '~icons/mdi/github'
import twitter from '~icons/mdi/twitter'
import linkedin from '~icons/mdi/linkedin'
import email from '~icons/mdi/email'
import laravel from '~icons/mdi/laravel'
import vuejs from '~icons/mdi/vuejs'
import tailwindcss from '~icons/mdi/tailwind'
import inertia from '~icons/ic/baseline-double-arrow'
import arrowLeft from '~icons/heroicons-solid/arrow-narrow-left'
import arrowRight from '~icons/heroicons-solid/arrow-narrow-right'
import backend from '~icons/bxs/terminal'
import frontend from '~icons/mdi/palette-swatch-variant'
import other from '~icons/mdi/briefcase-variant'
import heart from '~icons/heroicons/heart-20-solid'

const icons = {
	github,
	twitter,
	linkedin,
	email,
	laravel,
	vuejs,
	tailwindcss,
	inertia,
	arrowLeft,
	arrowRight,
	backend,
	frontend,
	other,
	heart,
}

defineProps<{
	icon: keyof typeof icons
	class?: string
}>()
</script>

<template>
	<component :is="icons[icon]" :class="$props.class" aria-hidden="true" />
</template>
