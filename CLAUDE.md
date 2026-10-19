# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Sergio Gómez, built with Astro 5 as a fully static site. No tests or linter are configured.

## Commands

**Use pnpm only — never npm or yarn.** Don't create `package-lock.json`; `preinstall` runs `only-allow pnpm`. Dependency build scripts (esbuild, sharp, @parcel/watcher) are approved under `allowBuilds` in `pnpm-workspace.yaml`. New packages with install scripts must be added there.

```bash
pnpm install
pnpm dev       # Astro dev server (http://localhost:4321)
pnpm build     # static output to dist/
pnpm preview   # serve the built dist/ (http://localhost:4321)
```

Because pnpm doesn't hoist packages, anything Astro loads at runtime (such as `sharp` for `astro:assets`) has to be a direct dependency.

## Architecture

- **Layout:** follows standard Astro conventions.
  - `src/pages/`: each route holds its own content, wrapped in `<BaseLayout>`. Content used by only one page belongs in that page file; don't add one-off "main" components.
  - `src/components/`: reusable pieces in PascalCase (`Header`, `Footer`, `Nav`, `SocialNav`, `ProjectCard`, `Icon`).
  - `src/components/sections/`: full-width sections that appear on several pages (`Hero`, `Projects`, `Contact`, all reused on the home page).
  - Also: `src/layouts/`, `src/content/` with `src/content.config.ts`, `src/scripts/`, `src/styles/`, `src/assets/`, and `public/` for files copied verbatim.
- **Import aliases** are defined in `tsconfig.json` `paths`: `@/*`, `@components/*`, `@layouts/*`, `@assets/*`, `@styles/*` and `@scripts/*`, all pointing into `src/`. Use them instead of relative `../` imports. They work in frontmatter, `<script>` and `import.meta.glob`, but **not** in CSS/SCSS `url()`, which uses root paths such as `url('/src/assets/...')`. SCSS partials `@use` each other relatively.
- **One layout for every page:** `src/layouts/BaseLayout.astro` (props `title` and `description`) renders the whole document: `<head>`, `<Header />`, a `<main id="content">` slot and `<Footer />`. Header and footer render only their own elements; never open or close `<html>`/`<body>` in a component.
- **Global styles and JS:** `BaseLayout` imports `@styles/global.scss` (the entry point that `@use`s every partial) and runs `src/scripts/main.js` from a `<script>` tag. `main.js` wires the theme toggle, the mobile menu, the header blur on scroll and the footer year. It runs on every page, so its `querySelector` calls assume the header and footer markup exists. Component-specific scripts stay in that component's `<script>` (e.g. the contact form's submit handler, the hero's code editor).
- **Styling is SCSS with BEM-style classes** (`header__nav`, `card__title`, …). Shared tokens live in `src/styles/abstract/_variables.scss` (imported with `@use '../abstract/variables' as *;`). No CSS framework is used (Tailwind was removed on purpose; don't reintroduce it). Form controls are styled explicitly with the theme tokens instead of relying on browser `color-scheme` defaults.
- **Light/dark theming:** `<html data-theme="dark">` is the default. An `is:inline` script in `BaseLayout`'s `<head>` applies `localStorage.theme` before first paint, and `main.js` owns the `#theme-toggle` button (it flips `data-theme` and saves the choice). In components, use the role tokens (`--clr-bg`, `--clr-text`, `--clr-text-muted`, `--clr-heading`, `--clr-surface`, `--clr-border`, `--clr-border-strong`), not raw palette colors. Light values are in `styles/themes/_light.scss` (`:root`) and dark overrides in `styles/themes/_dark.scss` (`[data-theme="dark"]`). The footer and the hero code editor use fixed brand colors in both themes. Elements that differ per theme (header logo, toggle icons) are swapped with `[data-theme="dark"]` CSS.
- **Projects are a content collection** (`projects`, defined in `src/content.config.ts` with a zod schema). Each `.md` in `src/content/projects/` has `title`, optional `link`, `tags`, and `img`. `img` is a path *relative to the markdown file* (`../../assets/img/projects/x.png`) validated by `image()`, so a wrong path fails the build. `sections/Projects.astro` sorts entries by filename prefix (`1-`, `2-`, …) and passes `project.data` to `ProjectCard`, with the rendered markdown as the card's slot. Adding a project means adding an image and a new `.md` file.
- **Icons:** use `<Icon icon={faSomething} size={20} />` (`src/components/Icon.astro`) with icon definitions from `@fortawesome/free-solid-svg-icons` / `free-brands-svg-icons`. It renders an inline `<svg>`; the Font Awesome CSS/JS runtime is not used.
- **No comments in build output:** Vite's minifier already strips comments from bundled JS and CSS/SCSS. Astro keeps HTML comments, so in `.astro` templates write comments as `{/* … */}` (removed at compile time), never `<!-- -->`. `is:inline` scripts aren't processed by Vite, so keep comments out of them.
- **Hero code editor:** `sections/Hero.astro` imports `@scripts/code-editor/CodeEditor.js` (a tabbed, Prism-highlighted fake editor with its own `prism.scss`). Keep the casing of import paths exact: the repo is developed on Windows, so a mismatch goes unnoticed locally but breaks Linux builds.

## Deployment

`dist/` is committed and deployed to a cPanel/Apache host. Astro wipes `dist/` on each build, so the Apache config lives at `public/.htaccess` (copied into `dist/` on build, along with `favicon.ico`). It rewrites extensionless URLs (e.g. `/about`) to `.html` files. Edit it there, never in `dist/`.
