import { cn } from "cn";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("text-xs text-muted-foreground lg:mt-auto", className)}>
      built by{" "}
      <a
        href="https://github.com/arhamkhnz"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        arhamkhnz
      </a>
    </footer>
  );
}
