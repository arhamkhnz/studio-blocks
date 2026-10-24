"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { blockCategories, type CategoryFilter } from "@/features/filters/block-categories";

function parseCategory(params: Pick<URLSearchParams, "getAll">): CategoryFilter {
  const values = params.getAll("category");
  if (values.length !== 1) return "all";
  return blockCategories.find((category) => category.value === values[0])?.value ?? "all";
}

export function updateCategory(category: CategoryFilter, replace = false) {
  const url = new URL(window.location.href);
  url.searchParams.delete("category");
  if (category !== "all") url.searchParams.set("category", category);
  if (url.href === window.location.href) return;

  const href = `${url.pathname}${url.search}${url.hash}`;
  if (replace) window.history.replaceState(null, "", href);
  else window.history.pushState(null, "", href);
}

export function useCategoryFilter() {
  const searchParams = useSearchParams();
  const category = parseCategory(searchParams);

  useEffect(() => {
    // Remove invalid, repeated, or redundant default values without adding a history entry.
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.has("category") && parseCategory(currentParams) === "all") {
      updateCategory("all", true);
    }
  }, [searchParams]);

  return [category, updateCategory] as const;
}
