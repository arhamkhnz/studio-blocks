"use client";

import { useId, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { useCanvasCamera } from "./use-canvas-camera";

type InfiniteCanvasProps = {
  children?: ReactNode;
  className?: string;
};

export function InfiniteCanvas({ children, className }: InfiniteCanvasProps) {
  const { viewportRef, worldRef } = useCanvasCamera();
  const instructionsId = useId();

  return (
    <div
      ref={viewportRef}
      data-canvas-viewport
      role="region"
      aria-label="Studio Blocks canvas"
      aria-describedby={instructionsId}
      tabIndex={0}
      className={cn("relative h-dvh w-full overflow-hidden bg-background outline-offset-[-2px]", className)}
    >
      <p id={instructionsId} className="sr-only">
        Drag to pan. Scroll or pinch to zoom. When the canvas is focused, use arrow keys to pan, plus and minus to zoom,
        and zero to reset.
      </p>
      <div ref={worldRef} className="relative size-full">
        {children}
      </div>
    </div>
  );
}
