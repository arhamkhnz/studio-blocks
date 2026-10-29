"use client";

import { lazy, Suspense } from "react";

import {
  CodeBlock as CodeBlockRoot,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@studio-blocks/blocks-ui/components/code-block";
import { Skeleton } from "@studio-blocks/blocks-ui/components/skeleton";

const HighlightedCode = lazy(() => import("./highlighted-code"));

type CodeBlockProps = {
  code: string;
  title?: string;
  language?: string;
  lineNumbers?: boolean;
};

export function CodeBlock({ code, title, language, lineNumbers = false }: CodeBlockProps) {
  const plainCode = <CodeBlockContent lineNumbers={lineNumbers}>{code}</CodeBlockContent>;
  const actions = (
    <CodeBlockActions>
      <CodeBlockCopyButton key={code} value={code} />
    </CodeBlockActions>
  );

  return (
    <CodeBlockRoot className="rounded-none">
      {title ? (
        <CodeBlockHeader>
          <CodeBlockTitle>{title}</CodeBlockTitle>
          {actions}
        </CodeBlockHeader>
      ) : (
        actions
      )}
      {language ? (
        <Suspense fallback={plainCode}>
          <HighlightedCode code={code} language={language} lineNumbers={lineNumbers} />
        </Suspense>
      ) : (
        plainCode
      )}
    </CodeBlockRoot>
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
