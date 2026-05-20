// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isBuild = process.env.NODE_ENV === "production" || process.argv.includes("build");

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  cloudflare: false,
  vite: {
    ssr: {
      noExternal: isBuild ? ["mongoose", "mongodb"] : [],
    },
    plugins: [
      {
        name: "inject-require-banner",
        renderChunk(code, chunk, options) {
          if (options.ssr) {
            return {
              code: `import { createRequire } from 'module';\nconst require = createRequire(import.meta.url);\n${code}`,
              map: null,
            };
          }
          return null;
        },
      },
    ],
  },
});

