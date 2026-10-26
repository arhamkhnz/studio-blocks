"use client";

import { useState } from "react";

import { SidebarProvider, SidebarTrigger } from "@studio-blocks/blocks-ui/components/sidebar";

import { AppSidebar } from "./sidebar-01";

export default function Example() {
  const [activePath, setActivePath] = useState("/dashboard");

  return (
    <SidebarProvider className="relative mx-auto h-180 min-h-0 w-fit max-w-full overflow-hidden rounded-xl border contain-[layout_paint]">
      <AppSidebar activePath={activePath} onNavigate={setActivePath} />
      <SidebarTrigger className="m-2 md:hidden" />
    </SidebarProvider>
  );
}
