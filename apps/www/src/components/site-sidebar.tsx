import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteSidebar({
  title = "A collection of minimal, reusable UI blocks",
  description = "Built with React, Tailwind CSS, and shadcn/ui.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <aside className="flex flex-col gap-12 lg:sticky lg:top-8 lg:h-[calc(100dvh-4rem)] lg:self-start">
      <SiteHeader />
      <div className="flex max-w-sm flex-col gap-4">
        <h1 className="text-4xl font-light tracking-tight text-balance lg:text-3xl">{title}</h1>
        <p className="max-w-64 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <SiteFooter />
    </aside>
  );
}
