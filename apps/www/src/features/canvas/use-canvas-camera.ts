"use client";

import Panzoom from "@panzoom/panzoom";
import { useEffect, useRef } from "react";

export function useCanvasCamera() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const world = worldRef.current;

    if (!viewport || !world) return;

    const camera = Panzoom(world, {
      canvas: true,
      cursor: "grab",
      minScale: 0.2,
      maxScale: 3,
      panOnlyWhenZoomed: false,
      pinchAndPan: true,
      excludeClass: "panzoom-exclude",
    });

    const handleDragStart = () => {
      viewport.style.cursor = "grabbing";
    };

    const handleDragEnd = () => {
      viewport.style.cursor = "grab";
    };

    const handleWheel = (event: WheelEvent) => {
      camera.zoomWithWheel(event);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Leave shortcuts inside live block previews to the block itself.
      if (event.target !== viewport || event.ctrlKey || event.metaKey || event.altKey) return;

      const distance = 64 / camera.getScale();

      switch (event.key) {
        case "+":
        case "=":
          camera.zoomIn();
          break;
        case "-":
          camera.zoomOut();
          break;
        case "0":
          camera.reset({ animate: false });
          break;
        case "ArrowLeft":
          camera.pan(distance, 0, { relative: true });
          break;
        case "ArrowRight":
          camera.pan(-distance, 0, { relative: true });
          break;
        case "ArrowUp":
          camera.pan(0, distance, { relative: true });
          break;
        case "ArrowDown":
          camera.pan(0, -distance, { relative: true });
          break;
        default:
          return;
      }

      event.preventDefault();
    };

    world.addEventListener("panzoomstart", handleDragStart);
    world.addEventListener("panzoomend", handleDragEnd);
    window.addEventListener("blur", handleDragEnd);
    viewport.addEventListener("wheel", handleWheel, { passive: false });
    viewport.addEventListener("keydown", handleKeyDown);

    return () => {
      world.removeEventListener("panzoomstart", handleDragStart);
      world.removeEventListener("panzoomend", handleDragEnd);
      window.removeEventListener("blur", handleDragEnd);
      viewport.removeEventListener("wheel", handleWheel);
      viewport.removeEventListener("keydown", handleKeyDown);
      camera.destroy();
      camera.resetStyle();
    };
  }, []);

  return { viewportRef, worldRef };
}
