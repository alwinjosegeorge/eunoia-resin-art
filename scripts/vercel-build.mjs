// scripts/vercel-build.mjs
// Post-build script: transforms dist/ into .vercel/output/ for Vercel deployment
import { execSync } from "node:child_process";
import { cpSync, mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// 1. Run vite build
console.log("📦 Building app with vite...");
execSync("vite build", { cwd: root, stdio: "inherit" });

// 2. Create .vercel/output structure
console.log("🚀 Creating Vercel output structure...");
const out = resolve(root, ".vercel/output");

// Clean previous output
try { rmSync(out, { recursive: true }); } catch {}

mkdirSync(`${out}/static`, { recursive: true });
mkdirSync(`${out}/functions/index.func`, { recursive: true });

// 3. Copy static client assets
console.log("📁 Copying static assets...");
cpSync(resolve(root, "dist/client"), `${out}/static`, { recursive: true });

// 4. Copy entire server bundle into the function directory
console.log("⚙️  Copying server bundle...");
cpSync(resolve(root, "dist/server"), `${out}/functions/index.func`, { recursive: true });

// 5. Create a thin Node.js wrapper that bridges server.fetch → Vercel
writeFileSync(
  `${out}/functions/index.func/index.js`,
  `import server from './server.js';
export default async function handler(request) {
  return server.fetch(request);
}
`
);

// 6. Vercel function config — use Node.js 20 runtime (supports mongoose/mongodb)
writeFileSync(
  `${out}/functions/index.func/.vc-config.json`,
  JSON.stringify({
    runtime: "nodejs20.x",
    entrypoint: "index.js",
  }, null, 2)
);

// 7. Vercel output config — serve static files directly, SSR everything else
writeFileSync(
  `${out}/config.json`,
  JSON.stringify({
    version: 3,
    routes: [
      { handle: "filesystem" },
      { src: "/(.*)", dest: "/index" },
    ],
  }, null, 2)
);

console.log("✅ Vercel output created at .vercel/output/");
