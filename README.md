# Personal Blog

A personal blog built with React, TanStack Start, TanStack Router, Tailwind CSS v4, Vite+, and deployed through Cloudflare Workers.

## Features

- **Vite+** - Unified dev/build/check/test command surface for the Vite toolchain.
- **React + TanStack Start** - SSR-capable React framework powered by TanStack Router.
- **Cloudflare Workers** - Deployment configured through the Cloudflare Vite plugin and Wrangler.
- **Tailwind CSS v4** - Utility styling with the Typography plugin for posts.
- **Markdown posts** - Blog posts stay in `src/lib/posts/` and are rendered on the server.
- **Interactive demos** - Post-specific React components, including the KMP visualization.

## Prerequisites

- Node.js 22+
- pnpm 9.5.0+
- Vite+ `vp` CLI
- Cloudflare API token for deployment

## Commands

```bash
vp install
vp dev
vp check
vp test
vp build
vp preview
vp run deploy
```

For deployment from a non-interactive shell, set `CLOUDFLARE_API_TOKEN` before running `pnpm run deploy`.

## Content

Posts are stored as `.mdx` files in `src/lib/posts/`. Each post needs frontmatter:

- `title`
- `date`
- `summary`
- `updatedOn` optional
- `draft` optional

The markdown renderer supports the existing mdsvex-era post content and maps `<KMP demo={1} />` / `<KMP demo={2} />` to the React KMP component.

## Project Structure

```text
src/
  lib/
    components/              React post components
    posts/                   Blog post content
    post-functions.ts        TanStack server functions
    posts.server.ts          Server-only post loading
    render-markdown.server.ts
  routes/                    TanStack Router file routes
  router.tsx                 Router factory
static/                      Public assets served by Vite
wrangler.jsonc               Cloudflare Workers config
```
