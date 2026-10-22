"use client";

import { Suspense, useEffect, useRef, useState, type ComponentType } from "react";

import type { BlockId } from "@/catalog/blocks";

const previews: Partial<Record<BlockId, ComponentType>> = {};

export function BlockPreview({ id, title }: { id: BlockId; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      root: element.closest("[data-canvas-viewport]"),
      rootMargin: "300px",
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const Preview = previews[id];

  return (
    <div ref={ref} className="w-full font-sans text-sm text-foreground">
      {visible && Preview ? (
        <Suspense
          fallback={
            <p className="flex min-h-32 items-center justify-center p-4 text-xs text-muted-foreground">
              Loading {title}…
            </p>
          }
        >
          <Preview />
        </Suspense>
      ) : (
        <div className="h-32" aria-hidden="true" />
      )}
    </div>
  );
}
