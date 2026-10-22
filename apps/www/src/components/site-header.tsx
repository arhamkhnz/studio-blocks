import { Button } from "@studio-blocks/blocks-ui/components/button";
import Image from "next/image";
import Link from "next/link";

import { GitHubIcon } from "@/components/icons/github";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-4">
      <Link
        href="/"
        className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <Image src="/studio-blocks.svg" alt="" width={24} height={24} className="size-6 shrink-0" />
        <span className="text-2xl leading-none font-[350] tracking-tighter">studio blocks</span>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="-mr-2"
        nativeButton={false}
        role="link"
        aria-label="GitHub"
        render={<a href="https://github.com/arhamkhnz/studio-blocks" target="_blank" rel="noopener noreferrer" />}
      >
        <GitHubIcon aria-hidden="true" />
      </Button>
    </header>
  );
}
