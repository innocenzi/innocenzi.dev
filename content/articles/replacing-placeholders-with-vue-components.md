---
title: Replacing parts of a string with Vue components
description: One cannot simply replace parts a string by some HTML that contains Vue code, so this article describes how to achieve this in a simple way.
created_at: 2023-02-04
---

Someone in the Inertia.js Discord server recently asked for a way to replace parts of an input string with custom Vue components:

![](https://media.cleanshot.cloud/media/35498/kmGJ7EEkaD4kasSVghbNtHZ3xx50FvjAIwhpP6pZ.jpeg?Expires=1675564042&Signature=EELdYK62ol0DjZbsOjPvuRGuTo4kkD8QmymZPzkca00qK6y9JMIsgAT6gtYY7am6BAQij5FhV~qPAApqHO9EB6N4aZK2NiDnMi1DYx5tN19jw~KnYcx~5vuIwbM1v4l-~JQGk-zqXc9JNsaQbcuskySD4ZbBrn4g8SL2yq6ah4JdLM4c5m~QStQFQLewLY~aXfq-45ER1FQjm6xSMG0oc05jsyL77oRpeOUNsK0TGGXV2TwpLDKCGfkT1PIKk0hNxnT~fQBLjfhAaat~r5QK4V0ufPwDcXvLqxfy4i1OemXE1TYo1HVsVK6XNvKQJ9Fon43dunOgBALwlKUF~cFG9A__&Key-Pair-Id=K269JMAT9ZF4GZ)

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

![](https://media.cleanshot.cloud/media/35498/DTrwzzdCKEzlAE8h9m6hw1QVcD2BJveHjEUNFF3E.jpeg?Expires=1675564385&Signature=WiuwvRE7Q~0xAfRsH3YBR9CeAxyVoSPBZzblUu9P3w2ZHg7HgCJss3akd4A-QPyT5Mu2bqI-sqzTEQrhaAZOr-ns~h5rPXsj5WGJX4S3U7U34RU3PZK6CuH2uYOw0sMOPco2f8ORtE9fpELEaC-9L76gM2oOJ3Nb~8hvcglTLz6WKoX-kLwOA2iUDWMnIdriBr4B8GE1AlejeApUPWL0hhVlIm~FA5U97IOfKbvMXL1KGHctPID949ZbvTo6G-y7zCZ-~Kl-sBNnJtai-jAaCbfmyMJnQt4JLlQNCwyIuRPiJKzQeUHg9gL4wDcbykXuJnYV01fA6Dkd7fBBtVV9mA__&Key-Pair-Id=K269JMAT9ZF4GZ)

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
