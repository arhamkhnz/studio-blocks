import { ArrowUpRight } from "lucide-react";

import { InfiniteCanvas } from "@/features/canvas/infinite-canvas";

export default function Page() {
  return (
    <main className="relative">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 grid grid-cols-[1fr_auto_1fr] items-center p-2.5 text-center">
        <div aria-hidden="true" />
        <p className="text-3xl tracking-tighter leading-none font-[350]">studio blocks</p>
        <a
          href="https://github.com/arhamkhnz/studio-blocks"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-flex self-stretch items-center justify-self-end gap-1 text-xl leading-none tracking-tighter hover:underline"
        >
          GitHub
          <ArrowUpRight aria-hidden="true" className="size-5" />
        </a>
      </header>

      <InfiniteCanvas>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-muted-foreground">Drag to explore. Scroll or pinch to zoom.</p>
        </div>
      </InfiniteCanvas>
    </main>
  );
}
