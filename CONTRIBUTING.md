# Contributing to Studio Blocks

Contributions can improve an existing block, fix an installation issue, make the website more accessible, or add a useful new block. Keep each pull request focused on one change.

For a new block or a substantial redesign, open an issue first with the use case, intended category, and a reference or sketch. Check existing issues and blocks to avoid duplicating work.

## Getting started

Fork the repository, clone your fork, and create a branch:

```bash
git clone https://github.com/YOUR_USERNAME/studio-blocks.git
cd studio-blocks
git switch -c feat/your-block
pnpm install
pnpm dev
```

Use Node.js 22.18 or newer and pnpm 11.15.1. The development site runs at `http://localhost:3000`. No environment variables are required for the current static website.

## Project structure

```text
apps/www/
  scripts/                       Registry generation and import rewriting
  src/app/                       Website routes, metadata, and social images
  src/components/                Website components
  src/features/                  Gallery, filters, and installation panels
  src/registry/blocks/
    kpi/kpi-01/
      kpi-01.tsx                 Static installable component
      registry-item.json         Block metadata and file list
    charts/chart-02/
      chart-02.tsx
      example.tsx                Website preview, sample data, and usage source
      flags.css                  Supporting file shipped with this block
      registry-item.json
  registry.json                  Generated source registry
  public/r/                      Generated public registry JSON, ignored by Git
packages/blocks-ui/
  src/components/                Shared shadcn primitives used by the website
```

The website uses the Base UI Nova preset. Both workspace `components.json` files route shadcn additions into `packages/blocks-ui`.

## Adding a block

### 1. Add the component

Create a folder under `apps/www/src/registry/blocks/<category>/<block-id>/`. Use an unused sequential ID such as `kpi-08` or `chart-03`; keep IDs unique across categories.

Export a named React component, for example `Kpi08`. Data-driven blocks should accept their data through typed props. Put sample data and demo composition in a colocated `example.tsx` with a default `Example` export. Static blocks that render without props do not need an example file.

The gallery, detail page, and iframe preview use `example.tsx` when present. The Usage tab reads the same file and rewrites its component import to the installed path. Keep the example self-contained, with sample data in that file. Do not list it in the manifest's `files`: only the reusable component and its required supporting files are installed.

- Compose existing shadcn primitives and import them directly from `@studio-blocks/blocks-ui/components/...`.
- Import `cn` from the `cn` package when needed.
- Use Lucide for icons and Tailwind CSS v4 for styling.
- Use theme tokens for surfaces, text, and borders. Keep data accents scoped to the block.
- Keep sample data in `example.tsx`, separate from the installable component and application integrations.
- Expose useful data and behavior through typed props. Do not imply that static sample data is connected to a live service.
- Add `"use client"` only when the component needs client features.
- Keep website routing, gallery wrappers, and installation UI out of the block's source.

If another shadcn primitive is needed, add it from the repository root:

```bash
pnpm dlx shadcn@latest add <component> --cwd apps/www
```

Check whether it is already installed first. Do not change the shared primitive just to style one preview; compose or style it from the block.

### 2. Add the manifest

Create `registry-item.json` next to the component:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "kpi-08",
  "type": "registry:block",
  "title": "Example Metric",
  "description": "A short description of what this block shows.",
  "categories": ["kpi"],
  "dependencies": ["cn"],
  "registryDependencies": ["card"],
  "files": [
    {
      "path": "kpi-08.tsx",
      "type": "registry:component"
    }
  ],
  "meta": {
    "order": 95,
    "component": "Kpi08",
    "preview": {
      "colSpan": 1,
      "rowSpan": 1
    }
  }
}
```

Replace the example's dependencies with the ones the block actually imports.

| Field                  | Meaning                                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                 | Must match the block folder and public installation ID.                                                                                             |
| `categories`           | Use the gallery category ID as the first entry. Available IDs are `kpi`, `charts`, `forms`, `tables`, `lists`, and `navigation`.                    |
| `dependencies`         | npm packages imported by the installed source, such as `cn`, `lucide-react`, or `recharts`.                                                         |
| `registryDependencies` | Standard shadcn primitives the block needs, such as `card`, `badge`, or `progress`.                                                                 |
| `files`                | Paths relative to this manifest. List the installable component's `.tsx` file first. Include every supporting file required after installation.     |
| `meta.component`       | The installable named React export. Used for previews and usage when there is no `example.tsx`.                                                     |
| `meta.order`           | Optional non-negative integer. Lower values appear first; ties sort by block ID. Missing values go last. Existing values leave gaps for insertions. |
| `meta.preview.colSpan` | Width of 1, 2, or 3 gallery columns. Defaults to 1.                                                                                                 |
| `meta.preview.rowSpan` | Positive integer controlling gallery height. Defaults to 1.                                                                                         |

Single-column previews have a 256px minimum height and grow for taller content. The grid uses its own container width: two columns at 38rem and three at 58rem. With multiple columns, rows stay fixed at 252px with a 12px gap: two rows are 516px. Row and column spans apply only in the multi-column layout. The dense grid can place later blocks into gaps, so visual placement is not always identical to source order.

`PreviewFrame` uses CSS for shared width limits, padding, and centering. It does not measure or scale content with JavaScript. Single-column and detail previews grow naturally; multi-column previews keep their assigned row height. Give taller blocks enough `rowSpan` to fit at their normal text size. Preview metadata controls only `colSpan` and `rowSpan`; do not add per-block `maxWidth` or `scale` settings. Use container queries inside responsive blocks.

A block spanning two columns does not need its own fixed width. Keep its component responsive and use preview metadata for gallery sizing.

### 3. Include supporting files

For a stylesheet or other copied asset, use `registry:file` with an explicit destination:

```json
{
  "path": "example.css",
  "type": "registry:file",
  "target": "@components/studio-blocks/example.css"
}
```

Keep relative imports valid after installation and avoid file names that would overwrite another block's supporting files. List required npm packages in the manifest as well as the relevant workspace dependencies.

### 4. Generate the registry

```bash
pnpm registry:build
```

The task:

1. Discovers per-block manifests recursively and validates their metadata and file paths.
2. Sorts blocks by `meta.order`, then ID.
3. Writes `apps/www/registry.json`, `apps/www/public/r/registry.json`, and the gallery catalog.
4. Builds the installable JSON files with the shadcn CLI.
5. Rewrites private workspace UI imports to portable `@/components/ui/...` imports and supplies default component destinations under `@components/studio-blocks`.

Do not edit generated registry JSON or `src/features/gallery/catalog.ts` manually. Commit changes to the tracked source registry and catalog alongside your component and manifest. Files in `public/r/` are ignored and rebuilt during deployment.

The public registry is flat: `/r/registry.json` and `/r/<block-id>.json`. Category folders only organize source code. The public index lists files without embedded source; individual item JSON contains the installable source.

## Checking your changes

Run the relevant checks before opening a pull request:

```bash
pnpm lint
pnpm format:check
pnpm build
```

`pnpm build` generates the registry before exporting the website.

Formatting and linting run from the repository root across all workspaces. Use `pnpm format` to format files, `pnpm lint:fix` for automatic lint fixes, or `pnpm fix` for both. Review the resulting diff and keep unrelated changes out of your PR.

For block changes, also check:

- The gallery and `/blocks/<block-id>` render correctly on mobile and desktop.
- Category filtering, preview size, and the installation, usage, and code panels are correct.
- Keyboard interactions and accessible names work for interactive controls.
- Empty data, long labels, and configurable values do not break the layout.
- Light and dark themes work when the block is installed in a consumer project.
- A fresh, initialized shadcn project can install the local item URL:

```bash
pnpm dlx shadcn@latest add http://localhost:3000/r/kpi-08.json
```

Confirm that imported primitives, npm dependencies, and supporting files resolve. Use the built JSON endpoints for installation; direct GitHub source installation bypasses our workspace import rewrite.

## Pull requests

Use a descriptive title such as `feat: add goal progress block` or `fix: prevent chart labels from overflowing`.

Explain the problem, resulting behavior, and checks you ran. Include screenshots for visual changes and a reference link when a design is adapted from another source. Call out any new dependencies and why they are needed. Only claim validation you actually performed.

Keep unrelated formatting, package updates, and generated changes out of the PR. Preserve appropriate attribution and do not contribute assets you do not have permission to distribute.

## Fonts and licensing

Project code uses the [MIT license](LICENSE). Contributions to the project code are made under that license.

The Timeless fonts have their own [bundled license](apps/www/src/lib/fonts/LICENSE.pdf). The website uses the variable WOFF2; OG and Twitter images use the static Sans Light and Regular TTFs because the image renderer does not support WOFF2. Do not include website fonts in registry items or replace their license with MIT.

## Questions

Open an [issue](https://github.com/arhamkhnz/studio-blocks/issues) with enough context to reproduce the problem or discuss the proposed block.
