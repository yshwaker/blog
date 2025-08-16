---
updatedOn: '2025-08-16T16:51:13.526Z'
---
# Personal Blog

A modern, fast, and clean personal blog built with SvelteKit and styled with Tailwind CSS v4. Features technical articles about web development, algorithms, and programming concepts.

## Features

- ⚡ **SvelteKit** - Modern web framework with SSG
- 🎨 **Tailwind CSS v4** - Latest utility-first CSS framework
- 📝 **MDX Support** - Write blog posts in Markdown with Svelte components
- 🌙 **Typography Plugin** - Beautiful typographic styling for content
- 🚀 **Static Generation** - Fast loading with pre-rendered pages
- 📱 **Responsive Design** - Mobile-first responsive layout
- 🔍 **SEO Optimized** - Meta tags and semantic HTML
- 🖥️ **Interactive Components** - Custom Svelte components for algorithms

## Tech Stack

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS v4 with Typography plugin
- **Content**: MDX with mdsvex
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Node.js**: 22.x
- **Build Output**: Static site in `/public`

## Getting Started

### Prerequisites
- Node.js 22.x (see `.node-version`)
- pnpm 9.5.0+

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to view the blog.

### Building

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

The built site will be generated in the `/public` directory.

## Content Management

Blog posts are written in MDX format and stored in `/src/lib/posts/`. Each post requires:

- `title` - Post title
- `date` - Publication date
- `summary` - Brief description
- `updatedOn` (optional) - Last modified date

## Project Structure

```
├── src/
│   ├── lib/
│   │   ├── posts/           # Blog posts (MDX)
│   │   └── components/      # Svelte components
│   ├── routes/              # SvelteKit routes
│   └── app.css             # Global styles
├── static/                  # Static assets
├── public/                  # Built site (generated)
└── scripts/                 # Build scripts
```

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm check        # Run Svelte type checking
pnpm lint         # Run ESLint
```
