---
title: Replacing parts of a string with Vue components
ogTitle: ['Replacing parts of a string', 'with Vue components']
description: One cannot simply replace parts a string by some HTML that contains Vue code, so this article describes how to achieve this in a simple way.
created_at: 2023-02-04
---

Someone in the Inertia.js Discord server recently asked for a way to replace parts of an input string with custom Vue components:

![](/images/replacing-placeholders-with-vue-components/00.png)

I had never done that, but thought it would be fun to find out how to do it. Turns out, you can't simply replace your placeholder with some HTML that calls a Vue component:

```ts
const input = 'This is some text with a __placeholder__'
const html = input.replace('__placeholder__', '<custom-component></custom-component>')
```

So I looked into it deeper, and found out that the correct way to do this is to use a render function. For the example above, the corresponding render function would be:

```ts
import { h } from 'vue'
import Placeholder from './placeholder.vue'

const render = () => [
  'This is some text with a ',
  h(Placeholder)
]
```

This is pretty simple, but we need to find a way to split the input string by multiple separators, and replace these separators with the render function. Since I'm lazy, I asked ChatGPT to do it for me:

![](/images/replacing-placeholders-with-vue-components/01.png)

Apparently, ChatGPT perfectly understood my gibberish prompt and gave me a fully working function. After cleaning it up a bit, the rest is a matter of mapping the result of this function to the components we want to replace:


```vue
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const input = 'This __foo__ and this __bar__ are Vue components'
const replacements = {
  '__foo__': () => h(Foo),
  '__bar__': () => h(Bar),
}

function splitByArray(inputString, splitArray) {
  return splitArray.reduce((result, splitString) => {
    return result.reduce((newResult, str) => {
      let parts = str.split(splitString);
      for (let i = 0; i < parts.length - 1; i++) {
        newResult.push(parts[i], splitString);
      }
      newResult.push(parts[parts.length - 1]);
      return newResult;
    }, []);
  }, [inputString]);
}

const render = () => splitByArray(input, Object.keys(replacements).map(part) => {
  return replacement[part]?.() ?? part
})
</script>

<template>
  <component :is="render" />
</template>
```
