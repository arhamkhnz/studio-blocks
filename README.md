<div align="center">
  <img src="apps/www/public/studio-blocks.svg" alt="Studio Blocks logo" width="64" height="64" />
  <h1>Studio Blocks</h1>
  <p>A collection of minimal, reusable UI blocks built with React, Tailwind CSS, and shadcn/ui.</p>
  <p>
    <a href="https://studio-blocks.arhamkhnz.com">Browse blocks</a> ·
    <a href="#installation">Installation</a> ·
    <a href="CONTRIBUTING.md">Contribute</a> ·
    <a href="https://github.com/arhamkhnz/studio-blocks/issues">Report an issue</a>
  </p>
</div>

[![Studio Blocks preview](https://studio-blocks.arhamkhnz.com/readme-image.png)](https://studio-blocks.arhamkhnz.com)

## About

Build dashboards and applications with blocks you can install, edit, and compose. The registry currently includes KPI cards and charts, with live previews, installation instructions, usage examples, and source code on each block's page.

- **Own the source.** Blocks are copied into your project, so you can change them to fit your application.
- **Use your shadcn setup.** Required UI primitives are installed through your project's shadcn configuration.
- **Start with a working example.** Blocks include sample data; configurable blocks accept your own values and callbacks.

## Installation

Start with a React project configured for [shadcn/ui](https://ui.shadcn.com/docs/installation) and Tailwind CSS v4. Open a block on the [website](https://studio-blocks.arhamkhnz.com) to find its installation and usage instructions.

Install directly from the public registry:

```bash
pnpm dlx shadcn@latest add https://studio-blocks.arhamkhnz.com/r/kpi-01.json
```

Or configure the namespace once in your project's `components.json`, preserving its other settings:

```json
{
  "registries": {
    "@studio-blocks": "https://studio-blocks.arhamkhnz.com/r/{name}.json"
  }
}
```

Then install blocks by name:

```bash
pnpm dlx shadcn@latest add @studio-blocks/kpi-01
```

By default, block files are installed under your components alias in `studio-blocks/`:

```tsx
import { Kpi01 } from "@/components/studio-blocks/kpi-01";

export default function Example() {
  return <Kpi01 />;
}
```

Imports follow your project's aliases. Supporting files, such as the visitor chart's `flags.css`, are included with the block. The private UI workspace used by this website is not a runtime dependency of installed blocks.

## Local development

Use Node.js 22.18 or newer and pnpm 11.15.1, as specified in `package.json`.

```bash
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). Registry generation runs before the development server starts. After changing a block or its manifest, run `pnpm registry:build` again to refresh its installation source and metadata.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the project structure, adding blocks, registry metadata, and checks. See [deployment](docs/deployment.md) for static export and Cloudflare settings.

## Contributing

Bug fixes, accessibility improvements, documentation, and new blocks are welcome. For a new block, start with an [issue](https://github.com/arhamkhnz/studio-blocks/issues) describing the use case and a reference so we can agree on its scope.

Read the [contributing guide](CONTRIBUTING.md) before opening a pull request.

## License

Project code is licensed under [MIT](LICENSE).

Timeless font files are covered by their [separate bundled license](apps/www/src/lib/fonts/LICENSE.pdf). They are used by the website and social images and are not included in installable blocks.

Built by [arhamkhnz](https://github.com/arhamkhnz).
