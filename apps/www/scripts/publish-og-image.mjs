import { copyFile } from "node:fs/promises";

// Next.js prerenders the metadata image during static export.
// Publish the same PNG under a stable filename for direct downloads.
await copyFile(new URL("../out/opengraph-image", import.meta.url), new URL("../out/og-image.png", import.meta.url));
