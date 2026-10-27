"use client";

import { Component, type ReactNode } from "react";
import Link from "next/link";

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@studio-blocks/blocks-ui/components/empty";

type PreviewErrorBoundaryProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export class PreviewErrorBoundary extends Component<PreviewErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <Link
        href={`/blocks/${this.props.id}`}
        prefetch={false}
        aria-label={`Open ${this.props.title} details`}
        className="absolute inset-0 grid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <Empty role="status" className="h-full rounded-none bg-preview">
          <EmptyHeader>
            <EmptyTitle>Preview unavailable</EmptyTitle>
            <EmptyDescription>Open {this.props.title} details</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Link>
    );
  }
}
