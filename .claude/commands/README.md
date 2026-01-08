# Claude Code Skills

Custom commands for managing this Astro blog.

## Available Commands

### Content Management

- **`/new-post [title]`** - Create a new blog post with proper frontmatter template
- **`/update-post [slug]`** - Update the `updatedDate` field of an existing post
- **`/list-posts`** - Display all posts in a formatted table with metadata
- **`/validate-posts`** - Check all posts have valid frontmatter and structure

### Development & Deployment

- **`/preview`** - Build and preview the production site
- **`/check-config`** - Verify site configuration is ready for deployment

## Usage

Invoke any command by typing `/` followed by the command name in your conversation with Claude Code.

Example:
```
/new-post My Amazing Blog Post
```

## Adding New Skills

To add a new skill, create a new `.md` file in this directory with:
1. A title (# skill-name)
2. Usage section
3. Description
4. Steps for Claude to follow

Claude Code will automatically discover and make it available.
