import { readdir, readFile, writeFile } from "node:fs/promises";
import { posix } from "node:path";

const registryDirectory = new URL("../public/r/", import.meta.url);
const defaultComponentDirectory = "@components/studio-blocks";
const componentTypes = new Set(["registry:component", "registry:block", "registry:ui"]);

for (const entry of await readdir(registryDirectory, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".json")) continue;

  const path = new URL(entry.name, registryDirectory);
  const item = JSON.parse(await readFile(path, "utf8"));
  let changed = false;

  for (const file of item.files ?? []) {
    if (!file.target && componentTypes.has(file.type)) {
      file.target = `${defaultComponentDirectory}/${posix.basename(file.path)}`;
      changed = true;
    }

    if (typeof file.content !== "string") continue;

    const content = file.content.replace(/(["'])@studio-blocks\/blocks-ui\/components\//g, "$1@/components/ui/");

    if (content !== file.content) {
      file.content = content;
      changed = true;
    }
  }

  if (changed) await writeFile(path, `${JSON.stringify(item, null, 2)}\n`);
}
