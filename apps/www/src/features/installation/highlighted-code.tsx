"use client";

import { CodeBlockContent, CodeBlockLine } from "@studio-blocks/blocks-ui/components/code-block";
import { useHighlightedCode } from "@studio-blocks/blocks-ui/hooks/use-highlighted-code";

type HighlightedCodeProps = {
  code: string;
  language: string;
  lineNumbers: boolean;
};

export default function HighlightedCode({ code, language, lineNumbers }: HighlightedCodeProps) {
  const lines = useHighlightedCode(code, language);

  return (
    <CodeBlockContent lineNumbers={lineNumbers}>
      {lines.map((line, index) => (
        <CodeBlockLine key={index}>{line}</CodeBlockLine>
      ))}
    </CodeBlockContent>
  );
}
