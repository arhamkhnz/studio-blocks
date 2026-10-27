import { readFile } from "node:fs/promises";
import { dirname, join, posix } from "node:path";

type RegistryItem = {
  files: { path: string; target: string }[];
  meta: { component: string };
};

export async function getInstallation(id: string) {
  const item: RegistryItem = JSON.parse(await readFile(join(process.cwd(), "public/r", `${id}.json`), "utf8"));
  const entry = item.files.find((file) => file.target.endsWith(".tsx"));
  if (!entry) throw new Error(`${id}: missing component entry.`);
  const importPath = entry.target.replace(/^@components\//, "@/components/").replace(/\.tsx$/, "");
  let usage = `import { ${item.meta.component} } from "${importPath}";\n\nexport default function Example() {\n  return <${item.meta.component} />;\n}`;

  try {
    const example = await readFile(join(process.cwd(), dirname(entry.path), "example.tsx"), "utf8");
    const localImport = `./${posix.basename(entry.path, ".tsx")}`;
    usage = example
      .replace(/(["'])@studio-blocks\/blocks-ui\/components\//g, "$1@/components/ui/")
      .replace(/(["'])(\.\/[^"']+)\1/g, (match, quote: string, path: string) =>
        path === localImport ? `${quote}${importPath}${quote}` : match,
      );
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
  }

  return {
    registryItem: `@studio-blocks/${id}`,
    registryUrl: `/r/${id}.json`,
    usage,
  };
}
