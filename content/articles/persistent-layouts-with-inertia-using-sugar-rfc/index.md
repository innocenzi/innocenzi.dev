---
title: 'Persistent layouts with the script setup sugar'
published: true
date: 24-04-2021
tags: ['Inertia']
description: ' '
---

The `setup` sugar is still in the [RFC](https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md) process. It grants a pretty neat syntax that replaces the classic `defineComponent`: 

```html
<template>
  <span>Hello {{ target }}</span>
</template>

<script setup lang="ts">
const target = 'world'
</script>
```

Without it, you would need to write some more boilerplate: 

```html
<template>
  <span>Hello {{ target }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    target: 'world'
  })
})
</script>
```

You can certainly guess the benefits, regarding the developer experience, of such a feature. 

There is an issue though: we can't set properties on the component anymore. With the usual syntax, we export an object, and the properties we define are tied to the object. Inertia [relies on this feature](https://github.com/inertiajs/inertia/blob/master/packages/inertia-vue3/src/app.js#L51) to find the layout a page component is supposed to use: 

```html
<script lang="ts">
import { defineComponent } from 'vue'
import layout from '@/layouts/main.vue'

export default defineComponent({
  layout, // <-- this will be in the component object
  data: () => ({
    target: 'world'
  })
})
</script>
```

I really wanted to keep using that syntax though, so I had to find a solution. While very easy to implement, the workaround I came up with is not really clean, even if it does the job.

Long story short, Vue uses `defineProps` and `defineEmits` at compile time via its SFC compiler, and we can abuse that to let Inertia find out our layout. The trade-off is that we can no longer use the property name of our choice, in my case `layout`. 

The workaround consists of defining a `layout` property via `defineProps`, and reading it in Inertia's `resolveComponent` callback. A page component would look like the following:

```html
<script setup lang="ts">
import layout from '@/views/layouts/main.vue'
import { defineProps } from 'vue'

defineProps({ layout })
</script>
```

And `resolveComponent` would need one more line: 

```ts
// resources/js/app.ts
const root = document.getElementById('app') as HTMLDivElement

createApp({
	render: () => h(app, {
		initialPage: JSON.parse(root.dataset.page!),
		resolveComponent: async(name: string) => {
			const { default: component } = (await import(`../views/pages/${name.replace('.', '/')}.vue`))
			component.layout ??= component.props?.layout

			return component
		},
	}),
}).use(inertia).mount(root)
```

The important bit is this line: `component.layout ??= component.props?.layout`. It reads the `layout` property we defined, and sets it on the `component` object directly. 

I use the [logical nullish assignment operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment) (`??=`) to not replace the `layout` property if it already exists, so you can keep using the `defineComponent` syntax if you want. The [optional chaining operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) handles the common case where we didn't define props.

## In closing

The workaround is quite simple, the syntax is clean, which is what I wanted. 

The issue is that we're abusing a feature that was not meant to be used like that, and we can't use the `layout` property name anymore on our page components.

An interesting fact about `defineProps` is that you don't even actually need to import it. The compiler specifically looks for the `defineProps` call, the import is only for the typings.
