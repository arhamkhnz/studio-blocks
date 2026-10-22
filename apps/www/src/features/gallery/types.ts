import type { ComponentType } from "react";

import type { BlockCategory } from "@/features/filters/block-categories";

export type GalleryBlock = {
  id: string;
  title: string;
  category: BlockCategory;
  component: ComponentType;
  colSpan: 1 | 2 | 3;
  previewMaxWidth: number;
  previewAspectRatio: string;
};
