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
import { Readable } from 'node:stream';

export default async function handler(reqOrRequest, res) {
  if (!res) {
    return server.fetch(reqOrRequest);
  }

  try {
    const req = reqOrRequest;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = \`\${protocol}://\${host}\${req.url}\`;

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value === undefined) continue;
      if (Array.isArray(value)) {
        for (const val of value) headers.append(key, val);
      } else {
        headers.set(key, value);
      }
    }

    const init = {
      method: req.method,
      headers,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      init.body = Readable.toWeb(req);
      init.duplex = 'half';
    }

    const webRequest = new Request(url, init);
    const webResponse = await server.fetch(webRequest);

    res.statusCode = webResponse.status;
    res.statusMessage = webResponse.statusText;

    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error) {
    console.error('Adapter error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
`
);

// 6. Vercel function config — use Node.js 20 runtime (supports mongoose/mongodb)
writeFileSync(
  `${out}/functions/index.func/.vc-config.json`,
  JSON.stringify({
    runtime: "nodejs20.x",
    handler: "index.js",
    launcherType: "Nodejs",
    shouldAddHelpers: true,
  }, null, 2)
);

// 6.5. Write package.json inside function directory to ensure ES module imports work
writeFileSync(
  `${out}/functions/index.func/package.json`,
  JSON.stringify({
    type: "module",
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
