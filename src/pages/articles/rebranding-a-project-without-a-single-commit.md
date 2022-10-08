---
layout: $/layouts/article.astro
title: Rebranding a project without a single commit
description: I've been working on a project called [name], but I couldn't find a name until long after the project was started. I wanted to rebrand the project, but I didn't want to have a big search-and-replace commit that would stain the commit history.
created_at: 2022-09-20
---

I've been working on a project called [[name]](https://github.com/monolikit), but I couldn't find a name until long after the project was started. The project's codename was Monolikit. 

I wanted to rebrand the project, but I didn't like the idea of having one big commit with a big search-and-replace. That would disrupt the history and cause trouble when using `git blame`.

The first thing I tried was a `git rebase -i` on the first commit - but that proved very tedious and I don't like manual work. So when looking for other solutions, I stumbled upon [`git-filter-repo`](https://github.com/newren/git-filter-repo), a tool for rewriting Git history. Exactly what I needed.

After installing it with `brew install git-filter-repo`, this simple one-liner solved all my problems:

```shell
git filter-repo --blob-callback
  \ 'blob.data = blob.data.replace(b"monolikit", b"[name]").replace(b"Monolikit", b"[name]").replace(b"MONOLIKIT", b"[name]")'
  \ --force
```

Basically, it goes over all the commits, and replace both `Monolikit` and `monolikit` with the new name.
