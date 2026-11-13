# Deployment — Cloudflare Pages

This project is intentionally static. It does not use Payload CMS, D1, R2, Workers bindings, runtime secrets, or Figma services.

## Cloudflare Pages settings

| Setting | Value |
|---|---|
| Framework preset | Next.js (Static HTML Export) or None |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` |
| Node.js | `22` |

If the dashboard supports build environment variables, set `NODE_VERSION` to `22`.

## Local verification

```bash
npm install
npm run typecheck
npm run build
```

Confirm that `out/index.html` and `out/work/<slug>/index.html` exist.

## Git publishing

1. Edit `src/content/projects.ts`.
2. Run the local checks above.
3. Commit and push to GitHub.
4. Cloudflare Pages automatically builds and deploys the new version.

## Domain

In Cloudflare Pages, open the project → Custom domains → Set up a custom domain. Follow the DNS prompts for the domain.
