"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import type { BlockId } from "@/catalog/blocks";
import { BlockPreview } from "@/features/canvas/block-preview";
import { cn } from "@/lib/utils";

export function GalleryPreview({
  id,
  title,
  width,
  columns = 1,
}: {
  id: BlockId;
  title: string;
  width: number;
  columns?: 1 | 2;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!stage || !content) return;

    const resize = () => {
      const inset = 48;
      setScale(
        Math.max(
          0.1,
          Math.min(
            1,
            (stage.clientWidth - inset) / width,
            (stage.clientHeight - inset) / Math.max(1, content.offsetHeight),
          ),
        ),
      );
    };

    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    observer.observe(content);
    resize();
    return () => observer.disconnect();
  }, [width]);

  return (
    <figure className={cn("min-w-0", columns === 2 && "sm:col-span-2")} aria-label={title}>
      <div
        ref={stageRef}
        className={cn("relative aspect-4/3 overflow-hidden rounded-lg bg-preview", columns === 2 && "sm:aspect-8/3")}
      >
        <div
          ref={contentRef}
          inert
          className="absolute top-1/2 left-1/2"
          style={{ width, transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          <BlockPreview id={id} title={title} />
        </div>
        <Link
          href={`/preview/${id}`}
          prefetch={false}
          aria-label={`Open ${title} preview`}
          className="absolute inset-0 rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
        />
      </div>
    </figure>
  );
}
