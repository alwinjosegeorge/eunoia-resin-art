// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isBuild = process.env.NODE_ENV === "production" || process.argv.includes("build");

let isSsr = false;

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    ssr: false,
  },
  vite: {
    ssr: {
      noExternal: isBuild
        ? [
            "mongoose",
            "mongodb",
            "bson",
            "mongodb-connection-string-url",
            "kareem",
            "mpath",
            "mquery",
            "sift"
          ]
        : [],
    },
    plugins: [
      {
        name: "inject-require-banner",
        configResolved(config) {
          isSsr = !!config.build.ssr;
        },
        renderChunk(code, chunk) {
          if (isSsr) {
            const cleanCode = code
              .replace(/(?<!\.)\brequire\s*\(/g, "globalThis.require(")
              .replace(/\btypeof\s+require\b/g, "typeof globalThis.require");
            return {
              code: `import { createRequire as _createRequire } from 'module';\nconst require = _createRequire(import.meta.url);\n${cleanCode}`,
              map: null,
            };
          }
          return null;
        },
      },
    ],
  },
});

