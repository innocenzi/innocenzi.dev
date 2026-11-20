## Conventions

- Files and directories are snake_case; components are imported under PascalCase identifiers.
- User-facing text lives in `src/i18n/en.json`, never inline in markup. The site is English only; posts, snippets and the facts in `src/data/` are the exception.
- Bun is the package manager: use `bun add` and `bunx`.
- mise is the task runner: tasks live in `mise.toml`, run them with `mise run <task>`.
- The `code-style` skill (`.agents/skills/code-style`) holds the full style rules.

## Content

- Posts live in `src/content/blog/`, snippets in `src/content/snippets/`. Their file names are their URLs, so renaming one breaks links. Collections and frontmatter are defined in `src/content.config.ts`. GitHub contributions are a collection too: its loader in `src/data/contributions.ts` fetches them when the dev server starts or the site builds, at most once an hour, and keeps the last successful fetch.
- Code blocks take a file name in brackets, as in ```` ```php [config/filesystems.php] ````. Wrap consecutive blocks in `:::code-group` and `:::` to show them as tabs.
- Projects, hardware and software are in `src/data/`. `src/data/me.ts` holds personal facts: name, social accounts, the links in the home and projects text, and the security contact, which appears only in `security.txt`. `src/data/entries.ts` sorts posts and groups snippets.

## Design

- Light and dark, following the system. Colours, fonts and sizes are tokens in `@theme` in `src/styles/global.css`, which holds the dark palette; the light one overrides it under `prefers-color-scheme: light`. Markdown styles are in `src/styles/prose.css`.
- Text is iA Writer Quattro, the name on the home page and the page titles are Instrument Serif, and labels, navigation and code are JetBrains Mono.
- Code is highlighted with Shiki's CSS variables theme; its colours are the `--color-code-*` tokens.
- Pages put a lowercase mono label above each section, with `labelled_section.astro`.
- Page blocks reveal in order with `animate-rise`, each with its place in `--rise`. Navigations swap pages without a fade: the root has `transition:animate="none"`.
- Inline links use the `link` utility. Links whose whole row is the target use `group` and `link-title` on their title.

## Logo

The signature is generated, never drawn by hand: the header, the favicon, the touch icon and the social cards all come from `src/logo/logo.ts`. Keep `COLOURS` in sync with `@theme` and the light palette in `src/styles/global.css`.

## Deployment

The site is static and deploys to Cloudflare Workers as assets only, see `wrangler.jsonc`. Run `mise run deploy` to build and deploy.

## Development

When starting the dev server, use background mode:

```
mise run dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Markdown, syntax highlighting and plugins](https://docs.astro.build/en/guides/markdown-content/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
