# Rashedul Karim — Static Portfolio

A static-export edition of the portfolio, prepared for Cloudflare Pages Direct Upload.

## Build the upload folder

Requirements: Node.js 22 LTS or newer and an internet connection for the first package installation. On Windows, double-click `Build-For-Cloudflare.bat`. It installs dependencies, builds the site, and creates `Cloudflare-Upload.zip` automatically.

Alternatively, run `npm install` and `npm run build`. Next.js creates the finished website in `out/`.

## Cloudflare Pages

1. Open **Workers & Pages → Create application → Pages → Direct Upload**.
2. Name the project and upload `Cloudflare-Upload.zip` (created by the build script), or upload the contents of `out/`.
3. Do not connect a Git repository, select Workers, or run Wrangler/OpenNext.

## Updating content

Published posts and project cards are stored in:

- `src/data/posts.json`
- `src/data/projects.json`

Edit those files and rebuild to publish changes. This static version does not include Payload CMS, an admin panel, database, server API, or server-side publishing.
