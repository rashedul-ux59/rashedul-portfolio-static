# Rashedul Karim — Portfolio

A lightweight, independent Next.js portfolio. It has no CMS, database, login, image-upload service, Figma runtime, or server-side API. Case studies are maintained as TypeScript content and the site is exported as static files for Cloudflare Pages.

## Requirements

- Node.js 22 or newer (under 25)
- npm 10 or newer

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run typecheck
npm run build
```

The static website is generated in `out/`.

## Update the logo and identity

- Replace `public/brand/logo.svg` with your own SVG logo (keep the same path), or update `logo.src` in `config/site.json`.
- Edit `config/site.json` to change your name, role, description, website URL, email, and logo display settings.
- Header logo placement is controlled in `src/components/SiteShell.tsx` and styled with `.brand` / `.brand-logo` in `src/app/(frontend)/styles.css`.

## Add or edit a case study

Open `src/content/projects.ts`. Add another object to the `projects` array with a unique `slug`. The case study automatically appears on the homepage and gets its own route at `/work/<slug>/` on the next build.

No images or videos are required. Case studies are text-first by design; you can add visual assets later if you choose.

## Layout rules

- Maximum site width: 1728px.
- Desktop outer gutter: 32px on each side.
- Small-screen outer gutter: 16px on each side.

## Deploy to Cloudflare Pages

1. Push the project source to your GitHub repository.
2. In Cloudflare Dashboard, open **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository and production branch.
4. Set build command to `npm run build`.
5. Set build output directory to `out`.
6. Set Node.js version to `22` in the build environment (`NODE_VERSION=22` if the dashboard asks for an environment variable).
7. Save and deploy.
8. Add your custom domain in the Pages project under **Custom domains**.

Cloudflare Pages will rebuild the static website on every push to the connected production branch.

## Publishing workflow

There is no admin panel. To publish a new case study, edit `src/content/projects.ts`, commit, and push. Cloudflare Pages builds and publishes the updated site automatically.
