"use client";

import { useState, type ComponentProps, type ComponentType, type MouseEvent } from "react";
import {
  ActivityIcon,
  BanknoteIcon,
  BuildingsIcon,
  ChartColumnIcon,
  FileIcon,
  HeadsetIcon,
  ReceiptIcon,
  SettingsIcon,
  UsersIcon,
  type IconProps,
} from "@keyline-icons/react";
import { cn } from "cn";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@studio-blocks/blocks-ui/components/sidebar";

const groups = [
  {
    label: "Workspace",
    items: [
      { title: "Overview", href: "/dashboard", icon: BuildingsIcon, exact: true },
      { title: "Contracts", href: "/dashboard/contracts", icon: FileIcon },
      { title: "People", href: "/dashboard/people", icon: UsersIcon },
    ],
  },
  {
    label: "Finance",
    items: [
      { title: "Payroll", href: "/dashboard/payroll", icon: BanknoteIcon },
      { title: "Invoices", href: "/dashboard/invoices", icon: ReceiptIcon },
    ],
  },
  {
    label: "Manage",
    items: [
      { title: "Reports", href: "/dashboard/reports", icon: ChartColumnIcon },
      { title: "Activity", href: "/dashboard/activity", icon: ActivityIcon },
    ],
  },
];

const footerItems = [
  { title: "Help & support", href: "/dashboard/support", icon: HeadsetIcon },
  { title: "Organization", href: "/dashboard/settings/organization", icon: SettingsIcon },
];

type NavigationItem = {
  title: string;
  href: string;
  icon: ComponentType<IconProps>;
  exact?: boolean;
};

export type AppSidebarProps = ComponentProps<typeof Sidebar> & {
  activePath?: string;
  onNavigate?: (href: string) => void;
};

export function AppSidebar({ activePath = "/dashboard", onNavigate, className, ...props }: AppSidebarProps) {
  const { setOpenMobile } = useSidebar();

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      onNavigate(href);
    }
    setOpenMobile(false);
  }

  function renderItem(item: NavigationItem) {
    const Icon = item.icon;
    const active =
      activePath === item.href ||
      activePath === `${item.href}/` ||
      (!item.exact && activePath.startsWith(`${item.href}/`));

    return (
      <SidebarMenuItem key={item.href}>
        <SidebarMenuButton
          isActive={active}
          className="gap-1.5"
          render={
            <a
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={(event) => navigate(event, item.href)}
            />
          }
        >
          <Icon aria-hidden="true" strokeWidth={1.75} />
          <span className="font-[450]">{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Sidebar collapsible="icon" className={cn("h-full", className)} {...props}>
      <SidebarHeader className="flex-row items-center gap-0">
        <SidebarMenu className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
          <SidebarMenuItem>
            <SidebarMenuButton
              className="gap-2"
              render={<a href="/dashboard" onClick={(event) => navigate(event, "/dashboard")} />}
            >
              <span
                aria-hidden="true"
                className="grid size-5 shrink-0 place-items-center rounded-sm bg-sidebar-primary font-mono text-xs text-sidebar-primary-foreground"
              >
                A
              </span>
              <span className="font-[450]">Acme Studio</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarTrigger className="shrink-0" />
      </SidebarHeader>
      <SidebarContent>
        <nav aria-label="Main navigation">
          {groups.map((group) => (
            <SidebarGroup key={group.label} className="py-1 first:pt-0">
              <SidebarGroupLabel className="font-mono font-normal uppercase">{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-px">{group.items.map(renderItem)}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator className="mx-0" />
        <SidebarMenu className="gap-px">{footerItems.map(renderItem)}</SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

// Standalone preview example. In your app's layout, wrap <AppSidebar /> and
// {children} with <SidebarProvider> to share collapse state and mobile toggling.
export function Sidebar01() {
  const [activePath, setActivePath] = useState("/dashboard");

  return (
    <SidebarProvider className="relative mx-auto h-180 min-h-0 w-fit max-w-full overflow-hidden rounded-xl border contain-[layout_paint]">
      <AppSidebar activePath={activePath} onNavigate={setActivePath} />
      <SidebarTrigger className="m-2 md:hidden" />
    </SidebarProvider>
  );
}
