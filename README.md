# Studio Blocks

A pnpm workspace with a Next.js website and shadcn registry, orchestrated by Turborepo.

## Setup

Use Node.js 22.18 or newer and pnpm 11.15.1. From the repository root:

```sh
pnpm install
pnpm dev
```

The homepage has a gallery layout alongside a sticky introduction on desktop. The block catalog and registry are currently empty. Filtering and installation UI remain placeholders. There is no consumer app.

## Gallery

`GalleryPreview` centers each live block inside a consistent preview surface. A `ResizeObserver` fits previews to the available space while preserving their source width and proportions. The catalog in `apps/www/src/catalog/blocks.ts` defines their source dimensions.

Preview code is imported lazily when it approaches the viewport, and distant preview content is unmounted. There are no thumbnail assets. Each label links to an isolated live preview.

The earlier Panzoom canvas components remain available under `apps/www/src/features/canvas`, but the homepage no longer mounts the canvas or its camera. Filters and installation controls are not implemented yet.

## UI components

The website and block previews share one Base UI Nova collection in the private `packages/blocks-ui` workspace. Both `components.json` files select `base-nova`; the website's UI alias routes CLI additions into that shared package. Next.js compiles its exported TypeScript directly, and Tailwind scans its source through `@source` in the app's global CSS.

`apps/www/src/components/ui` contains local re-exports from the shared package so registry source can keep portable `@/components/ui/...` imports. The site and previews use the same global theme tokens, with no separate preview theme.

From the repository root:

```sh
pnpm dlx shadcn@latest add <component> --cwd apps/www
```

When a new block needs another primitive, add its local re-export in `apps/www/src/components/ui` and its standard shadcn name to the block's `registryDependencies`.

Registry manifests include only block source. The private UI package and local re-exports are not distributed. Standard dependencies such as `card` and `button` follow the installing project's selected shadcn style and base; the registry does not force Nova.

## Fonts

The website loads Timeless Sans through `next/font/local` with weights 300–800, normal style, and `display: "block"`. It is the global default through Tailwind's `font-sans`.

The unmodified font assets and their license are in `apps/www/src/lib/fonts`. The fonts are proprietary and covered by the accompanying `LICENSE.pdf`, separately from the project code. Font assets are not included in installable registry items.

## Registry

Installable source lives in `apps/www/src/registry/blocks`. The website manifest at `apps/www/registry.json` includes each block's local manifest; file paths in those manifests are relative to their declaring manifest. The repository-root `registry.json` includes the website manifest so GitHub installation and website hosting share the same source catalog.

```sh
pnpm registry:build
```

This uses the website's installed shadcn CLI to generate the catalog and item JSON in `apps/www/public/r`. Turborepo also runs registry generation before development and production builds. Run the registry task again after editing a block during development. The catalog is served at `/r/registry.json`; individual items are served at `/r/<block-id>.json`.

After adding an item, generating the registry, and starting the website, install from another initialized shadcn project. The following commands use a placeholder item named `example-block`; no items are currently available:

```sh
pnpm dlx shadcn@latest add http://localhost:3000/r/example-block.json
```

After the source manifests and files are published to the public GitHub repository, users can also install without a registry server or generated JSON:

```sh
pnpm dlx shadcn@latest add arhamkhnz/studio-blocks/example-block
```

For hosted namespace installation, consumers configure the URL template in their own `components.json`. For local development:

```json
{
  "registries": {
    "@studio-blocks": "http://localhost:3000/r/{name}.json"
  }
}
```

They can then run `pnpm dlx shadcn@latest add @studio-blocks/example-block`. Replace the local origin with the deployed website's origin for public use. A locally configured namespace does not require directory approval; listing in shadcn's directory is a separate submission.

The CLI reads the selected item's files and dependencies, adds required npm packages, resolves standard shadcn primitives using the consumer's project configuration, and adjusts portable imports to their aliases. It copies source into the project; consumers do not depend on our private preview package at runtime. Public static JSON endpoints need no authentication. Private or paid items would need a separate access-control design.

Add future blocks to the source manifest. Keep website features and demo-only code out of installable file lists. Registry JSON is generated output; do not edit it manually.

## Production

```sh
pnpm build
pnpm start
```

On hosting platforms, use the repository root for dependency installation and run the root build task so registry generation runs before Next.js. The Next.js application is `apps/www`.

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
