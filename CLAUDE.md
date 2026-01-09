# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a technical blog built with Astro 5, featuring MDX support, RSS feeds, and a dark/light theme system. The blog is designed as a static site generator with content-driven architecture.

## Development Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:4321
npm run build            # Build production site to ./dist/
npm run preview          # Preview production build locally
npm run astro            # Run Astro CLI commands

# Check types
npx astro check          # Run Astro's type checking
```

## Architecture

### Content System

The blog uses Astro's **Content Collections API v5** with a file-based loader pattern:

- **Content location**: `src/content/blog/`
- **Supported formats**: `.md`, `.mdx` files
- **Collection schema**: Defined in `src/content.config.ts` using Zod
- **Loader**: Uses `glob()` loader from `astro/loaders` to automatically discover content files

**Content schema requirements**:
```typescript
{
  title: string,
  description: string,
  pubDate: Date,
  updatedDate?: Date,
  cover?: ImageMetadata
}
```

### Routing & Rendering

- **Blog post route**: `src/pages/blog/[...slug].astro` - Uses dynamic routing with `getStaticPaths()`
- **RSS feed**: `src/pages/rss.xml.ts` - Exports a `GET()` function that returns RSS XML
- **Blog list**: `src/pages/blog/index.astro` - Displays all posts sorted by date
- **Layout**: `src/layouts/BlogPost.astro` - Wrapper layout for individual blog posts

Blog posts are rendered by:
1. `getStaticPaths()` fetches all posts from the `blog` collection
2. Route params use `post.id` as the slug (derived from filename)
3. `render(post)` generates the `<Content />` component
4. BlogPost layout wraps the content with metadata and structure

### Theme System

The theme toggle (`src/components/ThemeToggle.astro`) implements:

- **Immediate initialization** to prevent flash of wrong theme
- **localStorage persistence** with key `'theme'`
- **System preference detection** via `prefers-color-scheme` media query
- **Theme attribute**: `data-theme="dark"` or `data-theme="light"` on `<html>`
- **Astro page transitions support**: Listens to `astro:page-load` event

Theme CSS is defined in `src/styles/global.css` using CSS custom properties with `:root` for light mode and `[data-theme="dark"]` for dark mode.

### Configuration

**Site-level config** (`src/consts.ts`):
- `SITE_TITLE` - Used in RSS feed and meta tags
- `SITE_DESCRIPTION` - Used in RSS feed and meta tags
- `SOCIAL_PROFILES` - Object with `email`, `github`, `linkedin`, `bluesky`

**Astro config** (`astro.config.mjs`):
- `site` - Base URL for the site (used in RSS and sitemap)
- Integrations: `@astrojs/mdx`, `@astrojs/sitemap`, `astro-icon`

### Icon System

Uses `astro-icon` with Iconify icon sets:
- Icon collections installed: `@iconify-json/mdi`, `@iconify-json/simple-icons`
- Usage: `<Icon name="mdi:icon-name" size={24} />`

## Adding New Content

Create a new file in `src/content/blog/` with proper frontmatter:

```markdown
---
title: 'Your Title'
description: 'Brief description'
pubDate: '2026-01-08'
updatedDate: '2026-01-09'  # optional
cover: ./images/hero.jpg  # optional, relative to file
---

Your content here...
```

The filename becomes the URL slug (e.g., `my-post.md` → `/blog/my-post/`).

## TypeScript Configuration

- Uses Astro's strict TypeScript config (`astro/tsconfigs/strict`)
- `strictNullChecks` enabled
- Generated types in `.astro/types.d.ts` (auto-generated)

## Component Structure

- `src/components/BaseHead.astro` - SEO meta tags and head elements
- `src/components/Header.astro` - Site header with navigation
- `src/components/Footer.astro` - Site footer
- `src/components/ThemeToggle.astro` - Dark/light mode toggle
- `src/components/SocialLinks.astro` - Social media icon links
- `src/components/FormattedDate.astro` - Date formatting utility
- `src/components/HeaderLink.astro` - Navigation link component

## Custom Claude Code Commands

This repository includes custom commands in `.claude/skills/`:

- **`/new-post [title]`** - Create a new blog post with template
- **`/update-post [slug]`** - Update the updatedDate field
- **`/list-posts`** - Display all posts with metadata
- **`/validate-posts`** - Check posts have valid frontmatter
- **`/preview`** - Build and preview production site
- **`/check-config`** - Verify site configuration

See `.claude/skills/README.md` for full documentation.

## Important Notes

- RSS feed automatically includes all posts sorted by `pubDate` (newest first)
- The `site` URL in `astro.config.mjs` must be set for RSS and sitemap to work correctly
- Theme preference persists across page loads via localStorage
- Hero images are processed by Astro's built-in image optimization
- The blog uses Astro's default SSG mode (no SSR)
