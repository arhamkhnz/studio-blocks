import type { ReactNode } from "react";
import { cn } from "cn";

const previewWidths = { 1: "max-w-sm", 2: "max-w-3xl", 3: "max-w-6xl" } as const;

type PreviewFrameProps = {
  children: ReactNode;
  colSpan: keyof typeof previewWidths;
  interactive?: boolean;
  className?: string;
};

export function PreviewFrame({ children, colSpan, interactive = false, className }: PreviewFrameProps) {
  return (
    <div className={cn("grid min-w-0 place-items-center bg-preview p-6", !interactive && "overflow-hidden", className)}>
      <div className={cn("w-full", previewWidths[colSpan])} inert={!interactive}>
        {children}
      </div>
    </div>
  );
}
