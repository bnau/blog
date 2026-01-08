# update-post

Update the updatedDate field of a blog post.

## Usage

```
/update-post [post-slug]
```

## Description

This command updates a blog post's `updatedDate` field to today's date, useful when you've made edits to an existing post.

## Steps

1. If post-slug is not provided, ask the user which post to update
   - Show a list of available posts
   - Let user select one

2. Find the post file in `src/content/blog/`

3. Check current frontmatter:
   - If `updatedDate` already exists, show current value
   - If it doesn't exist, add it

4. Update the frontmatter:
   - Set `updatedDate` to today's date (YYYY-MM-DD format)
   - Preserve all other frontmatter fields
   - Maintain formatting and structure

5. Confirm the update:
   - Show what changed
   - Display the new updatedDate value
   - Remind user this will appear as "Last updated on [DATE]" on the post

6. Optionally ask if user wants to commit the change
