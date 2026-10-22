import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

const captionHeight = 32;

export function getPreviewFrameSize(width: number, height: number) {
  return {
    width,
    height: height + captionHeight,
  };
}

export function PreviewFrame({
  title,
  href,
  maxHeight,
  children,
}: {
  title: string;
  href?: string;
  maxHeight: number;
  children: ReactNode;
}) {
  return (
    <figure className="group/preview w-full">
      <div className="overflow-hidden rounded-xl bg-card">
        <div className="w-full min-w-0 overflow-auto" style={{ maxHeight }}>
          {children}
        </div>
      </div>
      <figcaption className="flex items-center px-0.5 text-xs text-muted-foreground" style={{ height: captionHeight }}>
        {href ? (
          <a
            href={href}
            className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-sm py-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label={`Open ${title} preview`}
          >
            <span className="truncate">{title}</span>
            <ArrowUpRight
              className="size-3.5 shrink-0 text-muted-foreground opacity-0 group-focus-within/preview:opacity-100 group-hover/preview:opacity-100"
              aria-hidden="true"
            />
          </a>
        ) : (
          <span className="truncate">{title}</span>
        )}
      </figcaption>
    </figure>
  );
}
