# validate-posts

Validate all blog posts have correct frontmatter and structure.

## Usage

```
/validate-posts
```

## Description

This command checks all blog posts in `src/content/blog/` to ensure they:
- Have valid frontmatter with required fields (title, description, pubDate)
- Use correct date format for pubDate (YYYY-MM-DD or valid Date)
- Have proper file extensions (.md or .mdx)
- Don't have common issues (missing descriptions, invalid dates, etc.)

## Steps

1. Find all files in `src/content/blog/` matching `**/*.{md,mdx}`

2. For each file, check:
   - Has frontmatter delimiters (---)
   - Contains required fields: `title`, `description`, `pubDate`
   - Optional fields are properly formatted: `updatedDate`, `heroImage`
   - pubDate is a valid date format
   - If updatedDate exists, it's after or equal to pubDate

3. Report any issues found:
   - Missing required fields
   - Invalid date formats
   - Files without frontmatter
   - Dates that don't make sense (future dates, updatedDate before pubDate)

4. Show summary:
   - Total posts checked
   - Number of valid posts
   - Number of posts with issues

5. If all posts are valid, show success message
