# list-posts

List all blog posts with their metadata in a formatted table.

## Usage

```
/list-posts [--sort-by=date|title] [--order=asc|desc]
```

## Description

This command displays all blog posts with key metadata in an easy-to-read table format, sorted by publication date (newest first by default).

## Steps

1. Find all blog post files in `src/content/blog/`

2. Extract frontmatter from each file:
   - title
   - description (truncate if too long)
   - pubDate
   - updatedDate (if present)
   - filename/slug

3. Sort posts by:
   - Default: pubDate (descending - newest first)
   - Options: title (alphabetical), date (ascending or descending)

4. Display in a formatted table:

```
┌─────────────────────────────┬──────────────┬──────────────┬───────────────────┐
│ Title                       │ Slug         │ Published    │ Updated           │
├─────────────────────────────┼──────────────┼──────────────┼───────────────────┤
│ My Latest Post              │ latest-post  │ 2026-01-08   │ -                 │
│ Getting Started with Astro  │ first-post   │ 2026-01-06   │ 2026-01-07        │
└─────────────────────────────┴──────────────┴──────────────┴───────────────────┘

Total: 2 posts
```

5. Show count of total posts
