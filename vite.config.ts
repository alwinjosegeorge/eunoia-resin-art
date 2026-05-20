// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  cloudflare: false,
  vite: {
    ssr: {
      external: ["mongoose", "mongodb"],
    },
    plugins: [
      {
        name: "replace-mongodb-require",
        transform(code, id, options) {
          // Scope transform to only target database files loaded during server-side build (SSR)
          if (options?.ssr && (id.includes("mongodb") || id.includes("mongoose"))) {
            return {
              code: code.replace(/\brequire\(/g, "globalThis.require?.("),
              map: null,
            };
          }
          return null;
        },
      },
    ],
  },
});

