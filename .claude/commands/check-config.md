# check-config

Verify site configuration is properly set up.

## Usage

```
/check-config
```

## Description

This command checks that all necessary configuration is in place for the blog to work correctly, especially before deployment.

## Steps

1. Check `src/consts.ts`:
   - SITE_TITLE is set (not default)
   - SITE_DESCRIPTION is set (not default)
   - SOCIAL_PROFILES have real values (not "yourusername", "your.email@example.com", etc.)

2. Check `astro.config.mjs`:
   - `site` is set to actual domain (not "https://example.com")
   - All integrations are properly configured

3. Check for common issues:
   - Missing environment variables (if any are needed)
   - Placeholder values still in config
   - Invalid URLs

4. Report findings:
   - ✅ Items correctly configured
   - ⚠️  Items that might need attention
   - ❌ Items that must be fixed before deployment

5. Provide actionable recommendations:
   - What needs to be changed
   - Where to change it
   - Example values (when appropriate)

6. Show summary:
   - "Ready for production" if all critical items are set
   - "Needs configuration" if there are blockers
