---
name: code-style
description: Behavior-preserving style pass (naming, blank lines, section comments, item order, Tailwind usage) over the current Git diff. Use when the user asks for style cleanup or invokes /code-style.
---

# Code style pass

Edit directly unless asked for review only. Rendered output must not change.

## Scope

- Changed code in `git diff HEAD` plus untracked files, or whatever the user names.
- New files: all of it. Existing files: changed sections only.
- Skip `.astro/`, `dist/`, lockfiles, binaries, and the Markdown under `src/content/`. Never stage, commit, or discard.

## Naming

- Files and directories: snake_case (`site_header.astro`). Exceptions: Astro route syntax (`[slug]`, `[...path]`), content slugs (`src/content/**`, which become URLs) and tool-mandated names (`README.md`, `AGENTS.md`).
- Components: imported as PascalCase (`import SiteHeader from './site_header.astro'`). Astro treats lowercase or hyphenated tags as plain HTML, so kebab-case component tags are impossible.
- Translation keys: snake_case. If a second locale is added, every key goes in every `src/i18n/*.json`, same order in each.
- Write TypeScript, not JavaScript: `.ts` over `.js` and `.mjs`, config files included.

## Tailwind

- Use theme tokens and the default scale. No arbitrary values (`[…]`) unless no token or scale step fits.
- No `em` units.
- New colors, fonts, or sizes go in `@theme` in `src/styles/global.css`, not inline.

## Blank lines

Add one:

- between logical steps (setup, computation, values handed to the template);
- before and after control-flow blocks and multiline statements, unless they open or close their block;
- before a commented item, so the comment visibly belongs to it (not between labelled parts of a tight group, see Comments);
- between template landmarks (`<header>`, `<main>`, `<footer>`, top-level `<section>`);
- between computed values and `return` in a template callback with a body.

Keep together:

- short related declarations;
- attached `else` branches;
- short sibling elements of one group.

```astro
{navigation.map(({ key, href }) => {
	const isCurrent = isActive(href);

	return <a href={href} aria-current={isCurrent ? 'page' : undefined}>{t.navigation[key]}</a>;
})}
```

## Comments

Section labels mark where each block starts in a template, for readers scanning by eye. Keep them; add them to new markup.

- Form: `<!-- quick links -->`. Lowercase, one to four words, no punctuation.
- Name what the block is on the page, not its tag (`page` above `<slot />`). Label even when the tag matches (`header` above `<header>`).
- Place it directly above the block, same indentation, no blank line between. It covers everything up to the next label or blank line, so one label can head a run of `<meta>` tags.
- Label: landmarks, top-level sections, `<head>` groups, and the distinct parts inside them or inside a component (title, description, logo).
- Don't label: a component's root element, a labelled section's heading, layout wrappers, `.map()` items, frontmatter, scripts.
- Labelled parts of one tight group stack without blank lines.

```astro
<!-- header -->
<header>
	<div>
		<!-- title -->
		<h1>{post.data.title}</h1>
		<!-- description -->
		<p>{post.data.description}</p>
	</div>
	<!-- date -->
	<time datetime={…}>…</time>
</header>

<!-- content -->
<section>…</section>
```

Any other comment is a capitalised sentence with a full stop, and only warns about what the code can't show: keep-in-sync notes, tool limits, licence credits, a non-obvious why. Never describe what code does. Such a comment never replaces a label.

## Order

- Imports, grouped: stylesheets, then packages and `astro:*`, then local. Sorted by path within each group.
- Frontmatter: imports, `getStaticPaths`, `Props`, `Astro.props` destructuring, derived values.
- Destructuring and object literals follow the field order of their type.
- Helpers go below their first user.
- In existing files, move only changed items. Report a bad existing order instead of fixing it.

## Verify

- Run `git diff --check`.
- Renames or moves: `mise run build` must pass.
- Report what changed and what was not verified. If nothing needs changing, say so.
