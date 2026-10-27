"use client";

import { useEffect, useState } from "react";
import { Button } from "@studio-blocks/blocks-ui/components/button";
import { CodeBlock, CodeSkeleton } from "./code-block";

type RegistrySource = {
  files: { path: string; target?: string; content: string }[];
  dependencies?: string[];
  registryDependencies?: string[];
};

type SourceState = { status: "loading" } | { status: "error" } | { status: "ready"; item: RegistrySource };

type BlockSourceProps = {
  registryUrl: string;
  packageManager: string;
  componentCommand: string;
};

export default function BlockSource({ registryUrl, packageManager, componentCommand }: BlockSourceProps) {
  const [state, setState] = useState<SourceState>({ status: "loading" });
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSource() {
      try {
        const response = await fetch(registryUrl, { signal: controller.signal });
        if (!response.ok) throw new Error("Could not load source");
        const item: RegistrySource = await response.json();
        if (!Array.isArray(item.files) || item.files.some((file) => typeof file.content !== "string")) {
          throw new Error("Invalid registry source");
        }
        if (!controller.signal.aborted) setState({ status: "ready", item });
      } catch {
        if (!controller.signal.aborted) setState({ status: "error" });
      }
    }

    void loadSource();
    return () => controller.abort();
  }, [registryUrl, retry]);

  if (state.status === "loading") return <CodeSkeleton />;
  if (state.status === "error") {
    return (
      <div className="flex flex-col items-start gap-3" role="alert">
        <p className="text-sm text-muted-foreground">Could not load the code. Try again.</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setState({ status: "loading" });
            setRetry((value) => value + 1);
          }}
        >
          Retry
        </Button>
      </div>
    );
  }

  const { files, dependencies = [], registryDependencies = [] } = state.item;

  return (
    <>
      {registryDependencies.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">Add the required shadcn/ui components.</p>
          <CodeBlock code={`${componentCommand} ${registryDependencies.join(" ")}`} title="Terminal" />
        </div>
      )}
      {dependencies.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">Install the dependencies.</p>
          <CodeBlock
            code={`${packageManager} ${packageManager === "npm" ? "install" : "add"} ${dependencies.join(" ")}`}
            title="Terminal"
          />
        </div>
      )}
      <p className="text-sm text-muted-foreground">Copy the following code into your project.</p>
      {files.map((file) => (
        <CodeBlock
          key={file.path}
          title={(file.target ?? file.path).replace(/^@components\//, "components/")}
          code={file.content}
        />
      ))}
    </>
  );
}
