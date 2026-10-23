# Deployment

Studio Blocks uses Next.js static export. The production output includes the website, generated OG and Twitter images, fonts, and public registry JSON. It does not require a Next.js server or an OpenNext adapter.

## Build and preview

From the repository root:

```bash
pnpm build
pnpm start
```

The build runs registry generation before Next.js exports the website to `apps/www/out`. `pnpm start` serves the existing export through Wrangler; it does not create a build. It uses `pnpm dlx` to run Wrangler.

Both social images render as 1200 × 630 PNGs, matching the dimensions used in the Next.js documentation. After export, `scripts/publish-og-image.mjs` also copies the OG image to `out/og-image.png` for direct downloads.

The separate `/readme-image.png` route renders the same composition at 2400 × 1260. It is prerendered during static export and used by the README, so it refreshes with each build without committing an image snapshot. The shared layout lives in `src/lib/social-image.tsx`.

## Cloudflare Workers Builds

| Setting        | Value                                                  |
| -------------- | ------------------------------------------------------ |
| Root directory | Repository root                                        |
| Build command  | `pnpm run build`                                       |
| Deploy command | `npx wrangler deploy --config apps/www/wrangler.jsonc` |

The configuration at `apps/www/wrangler.jsonc` serves `./out`, relative to the configuration file. Its Worker name must match the project configured in Cloudflare. Keep the explicit configuration path in the deploy command: running automatic application detection at the monorepo root does not identify the website correctly.

Turborepo caches both the generated registry and static export. The registry task declares its manifests and scripts as inputs and `public/r/**` as an output.

## Verify a deployment

Check these endpoints after deployment:

- `/`: gallery and filters.
- `/blocks/kpi-01`: preview, installation, usage, and source.
- `/r/registry.json`: complete registry index, without `content` in its file entries.
- `/r/kpi-01.json`: installable item, with source and dependencies.
- `/r/chart-02.json`: visitor chart, including its `flags.css` file.
- `/opengraph-image` and `/twitter-image`: generated social images.
- `/readme-image.png`: higher-resolution README preview.
- `/sitemap.xml` and `/robots.txt`: search metadata.

Install an item into a separate initialized shadcn project to check the public registry end to end:

```bash
pnpm dlx shadcn@latest add @studio-blocks/kpi-01
```

## Registry namespaces

`@studio-blocks` is published in the shadcn registry directory. The CLI resolves the namespace automatically and adds its URL mapping to the user's `components.json`. Direct item URLs such as `https://studio-blocks.arhamkhnz.com/r/kpi-01.json` remain available.
