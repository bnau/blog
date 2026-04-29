# new-post

Create a new blog post with proper frontmatter and template.

## Usage

```
/new-post [title]
```

## Description

This command creates a new blog post file in `src/content/blog/` with:
- Proper frontmatter structure (title, description, pubDate)
- Filename based on the title (slugified)
- Today's date as pubDate
- Template content to get started

**IMPORTANT**: This blog is in French. All content (titles, descriptions, template text) should be in French unless explicitly requested otherwise.

## Steps

1. Ask the user for:
   - Post title (if not provided as argument)
   - Brief description
   - Optional: hero image path

2. Generate a slugified filename from the title (e.g., "My Post Title" → "my-post-title.md")

3. Create the file in `src/content/blog/` with this template:

```markdown
---
title: '[TITRE]'
description: '[DESCRIPTION]'
pubDate: '[DATE_DU_JOUR]'
---

## Introduction

Écrivez votre introduction ici...

## Contenu principal

Votre contenu principal ici...

## Conclusion

Concluez votre article ici...
```

4. Confirm the file was created and show the path
5. Optionally open the file for editing
