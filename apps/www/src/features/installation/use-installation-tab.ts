"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const tabs = ["preview", "installation", "usage", "code"] as const;
type InstallationTab = (typeof tabs)[number];

function parseTab(params: Pick<URLSearchParams, "getAll">, hasPreview: boolean): InstallationTab {
  const values = params.getAll("tab");
  const fallback = hasPreview ? "preview" : "installation";
  if (values.length !== 1) return fallback;
  return tabs.find((tab) => tab === values[0] && (hasPreview || tab !== "preview")) ?? fallback;
}

function updateTab(tab: InstallationTab, defaultTab: InstallationTab, replace = false) {
  const url = new URL(window.location.href);
  url.searchParams.delete("tab");
  if (tab !== defaultTab) url.searchParams.set("tab", tab);
  if (url.href === window.location.href) return;

  const href = `${url.pathname}${url.search}${url.hash}`;
  if (replace) window.history.replaceState(null, "", href);
  else window.history.pushState(null, "", href);
}

export function useInstallationTab(hasPreview: boolean) {
  const searchParams = useSearchParams();
  const defaultTab = hasPreview ? "preview" : "installation";
  const tab = parseTab(searchParams, hasPreview);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("tab") && parseTab(params, hasPreview) === defaultTab) {
      updateTab(defaultTab, defaultTab, true);
    }
  }, [searchParams, hasPreview, defaultTab]);

  function setTab(value: string) {
    if (tabs.some((tab) => tab === value && (hasPreview || tab !== "preview"))) {
      updateTab(value as InstallationTab, defaultTab);
    }
  }

  return [tab, setTab] as const;
}
