"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@studio-blocks/blocks-ui/components/tabs";
import { Suspense, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

import {
  CodeBlock as CodeBlockRoot,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
} from "@studio-blocks/blocks-ui/components/code-block";

import { CodeBlock, CodeSkeleton } from "./code-block";
import { useInstallationTab } from "./use-installation-tab";

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

export function BlockInstallation(props: InstallationProps) {
  return (
    <Suspense
      fallback={
        <Tabs value={null} className="min-w-0 flex-1 gap-6" aria-busy="true">
          <InstallationTabsList hasPreview={Boolean(props.preview)} />
          <CodeSkeleton />
        </Tabs>
      }
    >
      <BlockInstallationContent {...props} />
    </Suspense>
  );
}

function BlockInstallationContent({ registryItem, registryUrl, usage, preview }: InstallationProps) {
  const [tab, setTab] = useInstallationTab(Boolean(preview));
  const [packageManager, setPackageManager] = useState("pnpm");
  const [hasOpenedSource, setHasOpenedSource] = useState(tab === "code");
  if (tab === "code" && !hasOpenedSource) setHasOpenedSource(true);
  const commands = Object.entries(runners);
  const command = `${runners[packageManager as keyof typeof runners]} ${registryItem}`;

  return (
    <Tabs value={tab} onValueChange={(value) => setTab(String(value))} className="min-w-0 flex-1 gap-6">
      <InstallationTabsList hasPreview={Boolean(preview)} />
      {preview && (
        <TabsContent value="preview" className="flex min-w-0 flex-col">
          {preview}
        </TabsContent>
      )}
      <TabsContent value="installation" className="min-w-0">
        <CodeBlockRoot className="rounded-none">
          <Tabs
            value={packageManager}
            onValueChange={(value) => setPackageManager(String(value))}
            className="gap-4 pt-1 pb-2"
          >
            <CodeBlockHeader className="pt-0">
              <TabsList aria-label="Package manager" variant="line" className="gap-4 p-0">
                {commands.map(([manager]) => (
                  <TabsTrigger key={manager} value={manager} className="flex-none border-0 px-0 after:bottom-0">
                    {manager}
                  </TabsTrigger>
                ))}
              </TabsList>
              <CodeBlockActions>
                <CodeBlockCopyButton key={command} value={command} />
              </CodeBlockActions>
            </CodeBlockHeader>
            {commands.map(([manager, runner]) => (
              <TabsContent key={manager} value={manager}>
                <CodeBlockContent
                  aria-label={`${manager} installation command`}
                  className="py-0 group-has-data-[slot=code-block-header]/code-block:pt-0"
                >
                  {`${runner} ${registryItem}`}
                </CodeBlockContent>
              </TabsContent>
            ))}
          </Tabs>
        </CodeBlockRoot>
      </TabsContent>
      <TabsContent value="usage" className="min-w-0">
        <CodeBlock code={usage} language="tsx" lineNumbers />
      </TabsContent>
      <TabsContent value="code" keepMounted={hasOpenedSource} className="flex min-w-0 flex-col gap-6">
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

function InstallationTabsList({ hasPreview }: { hasPreview: boolean }) {
  return (
    <TabsList
      variant="line"
      aria-label="Block instructions"
      className="gap-6 px-0 *:data-[slot=tabs-trigger]:flex-none *:data-[slot=tabs-trigger]:border-0 *:data-[slot=tabs-trigger]:px-0 *:data-[slot=tabs-trigger]:after:-inset-x-0.5"
    >
      {hasPreview && <TabsTrigger value="preview">Preview</TabsTrigger>}
      <TabsTrigger value="installation">Installation</TabsTrigger>
      <TabsTrigger value="usage">Usage</TabsTrigger>
      <TabsTrigger value="code">Code</TabsTrigger>
    </TabsList>
  );
}
