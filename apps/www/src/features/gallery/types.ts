import type { ComponentType } from "react";

import type { BlockCategory } from "@/features/filters/block-categories";

export type GalleryBlock = {
  id: string;
  title: string;
  description: string;
  category: BlockCategory;
  component: ComponentType;
  colSpan: 1 | 2 | 3;
  rowSpan: number;
};
