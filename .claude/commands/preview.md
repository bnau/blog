# preview

Build and preview the production site.

## Usage

```
/preview
```

## Description

This command builds the site for production and starts a preview server to test the built output before deployment.

## Steps

1. Run `npm run build` to build the production site
   - Show build output
   - Check for any errors or warnings
   - Report on build time and output size

2. If build succeeds, run `npm run preview`
   - Start the preview server
   - Show the URL where the site can be accessed (typically http://localhost:4321)
   - Inform user the server is running in the background

3. If build fails:
   - Show the error messages
   - Suggest common fixes (type errors, missing dependencies, etc.)
   - Don't start preview server

4. Remind user:
   - How to stop the preview server (Ctrl+C)
   - The preview shows the production build (not dev mode)
   - Check the site works as expected before deploying
