# Studio Blocks

A pnpm workspace with a Next.js website and shadcn registry, orchestrated by Turborepo.

## Setup

Use Node.js 22.18 or newer and pnpm 11.15.1. From the repository root:

```sh
pnpm install
pnpm dev
```

The homepage contains an empty Panzoom canvas. Filtering, catalog, installation, and the remaining canvas files are placeholders. There is no consumer app.

## Canvas

`InfiniteCanvas` uses `@panzoom/panzoom` for DOM-based pan and zoom. Its camera hook initializes after mount and removes listeners on unmount. Panzoom updates the world transform directly; camera movement does not update React state.

Drag to pan, scroll or pinch to zoom. Focus the canvas to use arrow keys for panning, plus/minus for zooming, and zero to reset. Panning is unbounded; zoom is limited to 0.2–3 times the original size.

Render block previews as children of `InfiniteCanvas`. Add `panzoom-exclude` to interactive preview regions that should receive their own pointer and wheel events. Installable block source stays independent of canvas behavior. Viewport culling, lazy preview loading, filters, and hold-to-install are not implemented yet.

## Fonts

The website loads Timeless Sans and Timeless Serif through `next/font/local` with the same settings as TenderLayer: Sans weights 300–800, Serif weights 200–700, normal style, and `display: "block"`. Serif uses the Times New Roman fallback adjustment. Sans is the global default through Tailwind's `font-sans`; use `font-serif` for Serif.

The unmodified font assets and their license are in `apps/www/src/lib/fonts`. The fonts are proprietary and covered by the accompanying `LICENSE.pdf`, separately from the project code. Font assets are not included in installable registry items.

## Registry

Installable source lives in `apps/www/src/registry/blocks`. The root manifest at `apps/www/registry.json` includes each block's local manifest; file paths in those manifests are relative to their declaring manifest.

```sh
pnpm registry:build
```

This generates the catalog and item JSON in `apps/www/public/r`. Turborepo also runs registry generation before development and production builds. Run the registry task again after editing a block during development.

The first item, `dashboard-01`, is intentionally empty. It retains only the outer layout from [next-shadcn-admin-dashboard](<https://github.com/arhamkhnz/next-shadcn-admin-dashboard/blob/main/src/app/(main)/dashboard/default/page.tsx>). Its preview at `/preview/dashboard-01` imports the source directly, without an examples layer.

From another initialized shadcn project, while the website is running:

```sh
pnpm dlx shadcn@latest add http://localhost:3000/r/dashboard-01.json
```

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
- [next-shadcn-admin-dashboard](https://github.com/arhamkhnz/next-shadcn-admin-dashboard): Radix Nova configuration and empty dashboard starting layout.

Dependencies have not been installed and build, lint, typecheck, and registry generation have not been run as part of the initial file scaffold.
