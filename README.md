# Technical Blog

A modern technical blog built with [Astro](https://astro.build/), featuring MDX support, RSS feeds, and a beautiful dark/light theme.

## Features

- **Multiple Content Formats**: Write articles in Markdown, MDX
- **RSS Feed**: Automatic RSS feed generation at `/rss.xml`
- **Theme Toggle**: Seamless light/dark mode switching with preference persistence
- **Social Links**: Pre-configured social media icons for Email, GitHub, LinkedIn, and Bluesky
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Static Site**: Lightning-fast performance with static site generation

## Getting Started

### Prerequisites

- Node.js 18+ or compatible runtime
- npm or your preferred package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:4321`

## Configuration

### Site Settings

Edit `src/consts.ts` to customize:

```typescript
export const SITE_TITLE = 'Technical Blog';
export const SITE_DESCRIPTION = 'A collection of technical articles and insights';

export const SOCIAL_PROFILES = {
  email: 'your.email@example.com',
  github: 'yourusername',
  linkedin: 'yourprofile',
  bluesky: 'yourhandle.bsky.social',
};
```

### Site URL

Update the `site` field in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
  // ...
});
```

## Writing Articles

### Markdown/MDX Articles

Create files in `src/content/blog/` with frontmatter:

```markdown
---
title: 'Your Article Title'
description: 'A brief description'
pubDate: '2026-01-06'
updatedDate: '2026-01-07' # optional
---

Your article content here...
```

## Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── assets/        # Images and media files
│   ├── components/    # Reusable Astro components
│   ├── content/
│   │   └── blog/     # Blog posts (md, mdx, adoc)
│   ├── layouts/       # Page layouts
│   ├── loaders/       # Custom content loaders
│   ├── pages/         # Route pages
│   ├── styles/        # Global styles
│   └── consts.ts      # Site configuration
├── astro.config.mjs   # Astro configuration
└── package.json
```

## Theme Customization

The theme automatically detects system preferences and remembers user choices. Customize colors in `src/styles/global.css`:

```css
:root {
  --accent: #2337ff;
  /* Light mode colors */
}

[data-theme="dark"] {
  --accent: #4d7fff;
  /* Dark mode colors */
}
```

## RSS Feed

The RSS feed is automatically generated and available at `/rss.xml`. It includes all published articles.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Deployment

Build the site for production:

```bash
npm run build
```

The generated site will be in the `dist/` directory. Deploy to any static hosting service:

- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## Technologies

- **[Astro](https://astro.build/)** - Static site framework
- **[Astro Icon](https://github.com/natemoo-re/astro-icon)** - Icon system
- **[@astrojs/rss](https://docs.astro.build/en/guides/rss/)** - RSS feed generation
- **[@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/)** - MDX support

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
