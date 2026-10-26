import { readFile } from "node:fs/promises";
import { join } from "node:path";

type RegistryItem = {
  dependencies?: string[];
  registryDependencies?: string[];
  files: { target: string; content: string }[];
  meta: { component: string; usage?: string };
};

export async function getInstallation(id: string) {
  const item: RegistryItem = JSON.parse(await readFile(join(process.cwd(), "public/r", `${id}.json`), "utf8"));
  const entry = item.files.find((file) => file.target.endsWith(".tsx"));
  if (!entry) throw new Error(`${id}: missing component entry.`);
  const importPath = entry.target.replace(/^@components\//, "@/components/").replace(/\.tsx$/, "");

  return {
    registryItem: `@studio-blocks/${id}`,
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    files: item.files.map((file) => ({
      path: file.target.replace(/^@components\//, "components/"),
      content: file.content,
    })),
    usage: `import { ${item.meta.component} } from "${importPath}";\n\nexport default function Example() {\n  return ${item.meta.usage ?? `<${item.meta.component} />`};\n}`,
  };
}
