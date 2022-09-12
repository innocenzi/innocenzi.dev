<script setup lang="ts">
import github from '~icons/mdi/github'
import twitter from '~icons/mdi/twitter'
import linkedin from '~icons/mdi/linkedin'
import email from '~icons/mdi/email'
import laravel from '~icons/mdi/laravel'
import vuejs from '~icons/mdi/vuejs'
import tailwindcss from '~icons/mdi/tailwind'
import inertia from '~icons/ic/baseline-double-arrow'

const icons = {
	github,
	twitter,
	linkedin,
	email,
	laravel,
	vuejs,
	tailwindcss,
	inertia,
}

defineProps<{
	icon: keyof typeof icons
	class?: string
}>()
</script>

<template>
	<component :is="icons[icon]" :class="$props.class" />
</template>
