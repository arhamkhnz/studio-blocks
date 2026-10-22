import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: [
    "**/.next/**",
    "**/.turbo/**",
    "**/next-env.d.ts",
    "**/dist/**",
    "**/out/**",
    "**/coverage/**",
    "apps/www/public/**",
    "apps/www/src/components/ui/**",
    "packages/blocks-ui/src/components/**",
  ],
  plugins: ["react", "typescript", "oxc"],
  rules: {
    "react/rules-of-hooks": "error",
  },
  overrides: [
    {
      files: ["apps/www/**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}"],
      plugins: ["react", "typescript", "oxc", "nextjs"],
      rules: {
        "nextjs/no-img-element": "off",
      },
    },
  ],
});
