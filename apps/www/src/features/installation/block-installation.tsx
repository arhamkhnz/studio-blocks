"use client";

import { Button } from "@studio-blocks/blocks-ui/components/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@studio-blocks/blocks-ui/components/tabs";
import { Check, Copy } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

type SourceFile = { path: string; content: string };
type InstallationProps = {
  url: string;
  files: SourceFile[];
  dependencies: string[];
  registryDependencies: string[];
  usage: string;
  preview?: ReactNode;
};

const runners = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
};

function CopyButton({ value }: { value: string }) {
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

function CodeBlock({ code, title }: { code: string; title?: string }) {
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

export function BlockInstallation({
  url,
  files,
  dependencies,
  registryDependencies,
  usage,
  preview,
}: InstallationProps) {
  const [packageManager, setPackageManager] = useState("pnpm");
  const commands = Object.entries(runners);
  const command = `${runners[packageManager as keyof typeof runners]} ${url}`;

  return (
    <Tabs defaultValue={preview ? "preview" : "installation"} className="min-w-0 flex-1 gap-6">
      <TabsList variant="line" aria-label="Block instructions">
        {preview && <TabsTrigger value="preview">Preview</TabsTrigger>}
        <TabsTrigger value="installation">Installation</TabsTrigger>
        <TabsTrigger value="usage">Usage</TabsTrigger>
        <TabsTrigger value="source">Code</TabsTrigger>
      </TabsList>
      {preview && (
        <TabsContent value="preview" className="flex min-w-0 flex-col">
          {preview}
        </TabsContent>
      )}
      <TabsContent value="installation" className="min-w-0">
        <Tabs
          value={packageManager}
          onValueChange={(value) => setPackageManager(String(value))}
          className="gap-0 overflow-hidden border border-preview-border/60 bg-preview"
        >
          <div className="flex items-center justify-between gap-3 border-b border-preview-border/40 px-3 py-1.5">
            <TabsList aria-label="Package manager" className="bg-transparent">
              {commands.map(([manager]) => (
                <TabsTrigger key={manager} value={manager}>
                  {manager}
                </TabsTrigger>
              ))}
            </TabsList>
            <CopyButton key={command} value={command} />
          </div>
          {commands.map(([manager, runner]) => (
            <TabsContent key={manager} value={manager}>
              <pre className="overflow-x-auto px-4 py-4 text-sm leading-6">
                <code>
                  {runner} {url}
                </code>
              </pre>
            </TabsContent>
          ))}
        </Tabs>
      </TabsContent>
      <TabsContent value="usage" className="min-w-0">
        <CodeBlock code={usage} />
      </TabsContent>
      <TabsContent value="source" className="flex min-w-0 flex-col gap-6">
        {registryDependencies.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">Add the required shadcn/ui components.</p>
            <CodeBlock
              code={`${runners[packageManager as keyof typeof runners]} ${registryDependencies.join(" ")}`}
              title="Terminal"
            />
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
          <CodeBlock key={file.path} title={file.path} code={file.content} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
