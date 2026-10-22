# Studio Blocks

A pnpm workspace with a Next.js website and shadcn registry, orchestrated by Turborepo.

## Setup

Use Node.js 22.18 or newer and pnpm 11.15.1. From the repository root:

```sh
pnpm install
pnpm dev
```

The homepage has a sticky introduction on desktop, static category labels, and live block previews. There is no consumer app.

## UI components

The website uses Base UI Nova in the private `packages/blocks-ui` workspace. Button, Card, and Badge are currently installed. Both `components.json` files select `base-nova`; the website's UI alias routes CLI additions into that shared package. Next.js compiles its exported TypeScript directly, and Tailwind scans its source through `@source` in the app's global CSS.

Website and registry source import primitives directly from `@studio-blocks/blocks-ui/components/...`. After shadcn generates the hosted registry JSON, `apps/www/scripts/rewrite-registry-imports.mjs` rewrites that prefix to `@/components/ui/...` in published file contents. Components import `cn` directly from the `cn` package; the shared utility export exists for shadcn CLI configuration.

From the repository root:

```sh
pnpm dlx shadcn@latest add <component> --cwd apps/www
```

When a new block needs another primitive, install it in the shared package and add its standard shadcn name to the block's `registryDependencies`.

Registry manifests include only block source. The private UI package is not distributed. Standard dependencies such as `card` and `button` follow the installing project's selected shadcn style and base; the registry does not force Nova.

## Fonts

The website loads Timeless Sans through `next/font/local` with weights 300–800, normal style, and `display: "block"`. It is the global default through Tailwind's `font-sans`.

The unmodified font assets and their license are in `apps/www/src/lib/fonts`. The fonts are proprietary and covered by the accompanying `LICENSE.pdf`, separately from the project code. Font assets are not included in installable registry items.

## Registry

Installable source belongs in `apps/www/src/registry/blocks`. Add each block to the `items` array in `apps/www/registry.json`; file paths are relative to their declaring manifest. The repository-root `registry.json` includes the website manifest as a source entrypoint. The first item is `kpi-01`.

```sh
pnpm registry:build
```

This uses the website's installed shadcn CLI to generate the catalog and item JSON in `apps/www/public/r`, then rewrites workspace UI imports to portable imports. Turborepo also runs registry generation before development and production builds. Run the registry task again after editing a block during development. The catalog is served at `/r/registry.json`; individual items are served at `/r/<block-id>.json`.

After generating the registry and starting the website, install from another initialized shadcn project:

```sh
pnpm dlx shadcn@latest add http://localhost:3000/r/kpi-01.json
```

Use the hosted JSON endpoints for installation. Direct GitHub source installation bypasses our build-time import rewrite and is not supported with these private workspace imports.

For hosted namespace installation, consumers configure the URL template in their own `components.json`. For local development:

```json
{
  "registries": {
    "@studio-blocks": "http://localhost:3000/r/{name}.json"
  }
}
```

They can then run `pnpm dlx shadcn@latest add @studio-blocks/kpi-01`. Replace the local origin with the deployed website's origin for public use. A locally configured namespace does not require directory approval; listing in shadcn's directory is a separate submission.

The CLI reads the selected item's files and dependencies, adds required npm packages, resolves standard shadcn primitives using the consumer's project configuration, and adjusts portable imports to their aliases. It copies source into the project; consumers do not depend on our private preview package at runtime. Public static JSON endpoints need no authentication. Private or paid items would need a separate access-control design.

Add future blocks to the source manifest. Keep website features and demo-only code out of installable file lists. Registry JSON is generated output; do not edit it manually.

## Production

```sh
pnpm build
pnpm start
```

Next.js exports static HTML, CSS, JavaScript, fonts, and registry JSON into `apps/www/out`. `pnpm start` previews this export locally using Wrangler; it requires an existing build and downloads Wrangler through pnpm. Development remains `pnpm dev`.

Deploy with Cloudflare Workers Builds using these settings:

| Setting        | Value                                                  |
| -------------- | ------------------------------------------------------ |
| Root directory | Repository root                                        |
| Build command  | `pnpm run build`                                       |
| Deploy command | `npx wrangler deploy --config apps/www/wrangler.jsonc` |

The Wrangler configuration belongs to `apps/www` and serves its `out` directory as static assets. Its `name` must match the Worker name configured in Cloudflare; it currently uses `studio-blocks`. No Worker server script or OpenNext adapter is required for the current static site. Registry generation runs before the website build, so its output is included in the export. Turborepo caches the export through the build task's `out/**` output.

## Formatting and linting

Oxfmt and Oxlint are development dependencies at the repository root. Run their commands from the root; the shared configs cover root files and all workspaces, including installable registry source. Generated output and public assets are excluded.

```sh
pnpm lint          # Lint the repository
pnpm lint:fix      # Apply automatic lint fixes
pnpm format        # Format the repository
pnpm format:check  # Check formatting without writing
pnpm fix           # Apply lint fixes, then format
```

`oxfmt.config.ts` uses the same formatting options as TenderLayer: 120-column width, two spaces, semicolons, double quotes, trailing commas, LF endings, and no package.json sorting. `oxlint.config.ts` uses its React, TypeScript, and Oxc plugins, hook rule, and Next.js override adapted to `apps/www`.

These tools run centrally rather than through per-app Turbo tasks, so root files are covered once and app configs are not duplicated. App development, builds, and registry generation remain package tasks orchestrated by Turbo.

## References

- [shadcn registry template](https://github.com/shadcn-ui/registry-template): source manifest and static registry output pattern.
