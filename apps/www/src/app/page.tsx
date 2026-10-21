import { ArrowUpRight } from "lucide-react";

import { InfiniteCanvas } from "@/features/canvas/infinite-canvas";

export default function Page() {
  return (
    <main className="relative">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 grid grid-cols-[1fr_auto_1fr] items-center p-2.5 text-center">
        <div aria-hidden="true" />
        <p className="text-3xl leading-none font-[350] tracking-tighter">studio blocks</p>
        <a
          href="https://github.com/arhamkhnz/studio-blocks"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-flex items-center gap-1 self-stretch justify-self-end text-xl leading-none tracking-tighter hover:underline"
        >
          GitHub
          <ArrowUpRight aria-hidden="true" className="size-5" />
        </a>
      </header>

      <InfiniteCanvas>
        <div className="absolute top-1/2 left-1/2 flex w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 px-6 text-center">
          <h1 className="max-w-3xl font-serif text-4xl leading-[1.08] font-light tracking-tight text-balance [font-variation-settings:'STYL'_100] sm:text-5xl lg:text-6xl">
            A collection of minimal, reusable UI blocks
          </h1>
          <p className="max-w-xl text-base leading-relaxed tracking-tight text-balance text-muted-foreground sm:text-lg">
            Built with React, Tailwind CSS, and shadcn/ui.
          </p>
        </div>
      </InfiniteCanvas>
    </main>
  );
}
