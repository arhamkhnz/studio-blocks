import type { CanvasBlock } from "./layout";
import { BlockPreview } from "./block-preview";
import { PreviewFrame } from "./preview-frame";

export function CanvasItem({ id, title, x, y, width, previewHeight }: CanvasBlock) {
  return (
    <div className="panzoom-exclude absolute" style={{ left: x, top: y, width }}>
      <PreviewFrame title={title} href={`/preview/${id}`} maxHeight={previewHeight}>
        <BlockPreview id={id} title={title} />
      </PreviewFrame>
    </div>
  );
}
