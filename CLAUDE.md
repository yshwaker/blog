---
updatedOn: '2025-08-16T15:41:37.962Z'
---
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
pnpm dev          # Start development server at http://localhost:5173
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm check        # Run Svelte type checking
pnpm lint         # Run ESLint
pnpm lint:staged  # Run ESLint on staged files (used by Husky)
```

### Content Management
- Blog posts are MDX files in `/src/lib/posts/`
- Each post requires: `title`, `date`, `summary` fields in frontmatter
- Optional: `updatedOn` field for modification dates
- Run `node scripts/updateDate.js` to update modification dates

## Architecture

### Tech Stack
- **Framework**: SvelteKit with TypeScript
- **Content**: MDX files processed with mdsvex
- **Styling**: Tailwind CSS with @tailwindcss/typography
- **Code Highlighting**: Shiki with Material Theme Palenight
- **Analytics**: Splitbee integration

### Key Directories
- `/src/lib/posts/` - MDX blog posts
- `/src/routes/` - SvelteKit routes and pages
- `/src/lib/components/` - Svelte components
- `/src/lib/posts.ts` - Post loading utilities
- `/src/app.css` - Global CSS
- `/src/lib/heptabase-links.json` - External note links
- `/static/blog-images/` - Blog post images

### Content Processing Flow
1. MDX files in `/src/lib/posts/` are processed by mdsvex
2. Posts are loaded dynamically using `import.meta.glob()`
3. Type-safe post loading utilities in `/src/lib/posts.ts`
4. Blog posts are rendered at `/blog/[slug]`

### Styling System
- Tailwind CSS with PostCSS processing
- Custom theme extensions in `tailwind.config.js`
- Global styles in `/src/app.css`
- Typography customized for Chinese content (zh-Hans locale)

### Important Configuration
- **Package Manager**: Must use pnpm (version 9.5.0)
- **Locale**: Configured for Chinese (zh-Hans) with English fallback
- **Images**: Use standard `<img>` tags in MDX files
- **Components**: Import Svelte components in MDX using `<script>` blocks
- **Build Output**: Static site generation with @sveltejs/adapter-static
