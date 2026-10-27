"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@studio-blocks/blocks-ui/components/button";
import { Skeleton } from "@studio-blocks/blocks-ui/components/skeleton";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!copied && !failed) return;
    const timer = setTimeout(() => {
      setCopied(false);
      setFailed(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied, failed]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      setFailed(true);
    }
  }

  return (
    <>
      <Button variant="ghost" size="icon" onClick={copy} aria-label={copied ? "Copied" : "Copy code"}>
        {copied ? <Check /> : <Copy />}
      </Button>
      <span role="status" className="sr-only">
        {copied ? "Copied to clipboard" : failed ? "Could not copy. Select and copy the code manually." : ""}
      </span>
    </>
  );
}

export function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <div className="min-w-0 overflow-hidden border border-preview-border/60 bg-preview">
      <div className="flex items-center justify-between gap-3 border-b border-preview-border/40 px-3 py-1.5">
        <span className="truncate font-mono text-xs text-muted-foreground">{title ?? "tsx"}</span>
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-6">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function CodeSkeleton() {
  return (
    <div className="flex flex-col gap-3" role="status" aria-label="Loading code">
      <Skeleton className="h-10 w-full rounded-none bg-preview" />
      <Skeleton className="h-64 w-full rounded-none bg-preview" />
    </div>
  );
}
