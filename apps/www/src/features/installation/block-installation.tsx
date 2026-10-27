"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@studio-blocks/blocks-ui/components/tabs";
import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

import { CodeBlock, CodeSkeleton, CopyButton } from "./code-block";

type InstallationProps = {
  registryItem: string;
  registryUrl: string;
  usage: string;
  preview?: ReactNode;
};

const runners = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
};

const BlockSource = dynamic(() => import("./block-source"), { loading: CodeSkeleton });

export function BlockInstallation({ registryItem, registryUrl, usage, preview }: InstallationProps) {
  const [packageManager, setPackageManager] = useState("pnpm");
  const [hasOpenedSource, setHasOpenedSource] = useState(false);
  const commands = Object.entries(runners);
  const command = `${runners[packageManager as keyof typeof runners]} ${registryItem}`;

  return (
    <Tabs
      defaultValue={preview ? "preview" : "installation"}
      onValueChange={(value) => {
        if (value === "source") setHasOpenedSource(true);
      }}
      className="min-w-0 flex-1 gap-6"
    >
      <TabsList
        variant="line"
        aria-label="Block instructions"
        className="gap-6 px-0 *:data-[slot=tabs-trigger]:flex-none *:data-[slot=tabs-trigger]:border-0 *:data-[slot=tabs-trigger]:px-0 *:data-[slot=tabs-trigger]:after:-inset-x-0.5"
      >
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
                  {runner} {registryItem}
                </code>
              </pre>
            </TabsContent>
          ))}
        </Tabs>
      </TabsContent>
      <TabsContent value="usage" className="min-w-0">
        <CodeBlock code={usage} />
      </TabsContent>
      <TabsContent value="source" keepMounted={hasOpenedSource} className="flex min-w-0 flex-col gap-6">
        {hasOpenedSource && (
          <BlockSource
            key={registryUrl}
            registryUrl={registryUrl}
            packageManager={packageManager}
            componentCommand={runners[packageManager as keyof typeof runners]}
          />
        )}
      </TabsContent>
    </Tabs>
  );
}
