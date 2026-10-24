import type { ReactNode } from "react";
import { cn } from "cn";

const previewWidths = { 1: "max-w-sm", 2: "max-w-3xl", 3: "max-w-6xl" } as const;

type PreviewFrameProps = {
  children: ReactNode;
  colSpan: keyof typeof previewWidths;
  interactive?: boolean;
  iframeSrc?: string;
  className?: string;
};

export function PreviewFrame({ children, colSpan, interactive = false, iframeSrc, className }: PreviewFrameProps) {
  return (
    <div className={cn("grid min-w-0 place-items-center bg-preview p-6", !interactive && "overflow-hidden", className)}>
      <div className={cn("w-full", previewWidths[colSpan])} inert={!interactive}>
        {iframeSrc ? (
          <div className={cn("relative h-180 overflow-hidden", interactive && "lg:max-h-[calc(100dvh-14rem)]")}>
            <iframe
              src={iframeSrc}
              title="Block preview"
              loading="lazy"
              tabIndex={interactive ? undefined : -1}
              className={cn(
                "absolute top-0 left-1/2 h-full w-3xl -translate-x-1/2 border-0",
                !interactive && "pointer-events-none",
              )}
            />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
