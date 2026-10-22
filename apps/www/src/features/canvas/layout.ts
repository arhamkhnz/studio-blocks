import { blocks, type BlockId } from "@/catalog/blocks";
import { getPreviewFrameSize } from "./preview-frame";

export type CanvasBlock = {
  id: BlockId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  previewHeight: number;
};

function createBlockLayout(): CanvasBlock[] {
  let seed = 42;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const placed: CanvasBlock[] = [];

  for (const [index, block] of blocks.entries()) {
    const { width, height } = getPreviewFrameSize(block.width, block.height);
    const gap = Math.round(72 + random() * 48);

    for (let attempt = 0; ; attempt++) {
      // Grow the scatter outwards, expanding further if the nearby area is full.
      const spread = 820 + Math.sqrt(index) * 100 + Math.floor(attempt / 100) * 160;
      const x = Math.round((random() * 2 - 1) * spread - width / 2);
      const y = Math.round((random() * 2 - 1) * spread * 0.72 - height / 2);

      const coversIntroduction = x < 420 && x + width > -420 && y < 160 && y + height > -160;
      if (coversIntroduction) continue;

      const overlaps = placed.some(
        (block) =>
          x < block.x + block.width + gap &&
          x + width + gap > block.x &&
          y < block.y + block.height + gap &&
          y + height + gap > block.y,
      );
      if (overlaps) continue;

      placed.push({ ...block, x, y, width, height, previewHeight: block.height });
      break;
    }
  }

  return placed;
}

export const canvasBlocks = createBlockLayout();
