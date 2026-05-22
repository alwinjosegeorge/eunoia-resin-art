import { createRequire as _createRequire } from "module";
const require2 = _createRequire(import.meta.url);
const requireCache = /* @__PURE__ */ new Map();
let createRequireFn = null;
let fileURLToPathFn = null;
if (typeof window === "undefined") {
  try {
    const reqFn = typeof globalThis.require !== "undefined" ? require2 : null;
    if (reqFn) {
      const moduleKey = "module";
      const urlKey = "url";
      createRequireFn = reqFn(moduleKey).createRequire;
      fileURLToPathFn = reqFn(urlKey).fileURLToPath;
    }
  } catch (e) {
    console.error("Failed to load node built-ins in require-polyfill:", e);
  }
}
function getCallerFile() {
  if (typeof window !== "undefined") return null;
  if (!fileURLToPathFn) return null;
  const originalPrepare = Error.prepareStackTrace;
  try {
    Error.prepareStackTrace = (_, stack2) => stack2;
    const err = new Error();
    const stack = err.stack;
    if (!stack) return null;
    let callerFile = null;
    for (let i = 1; i < stack.length; i++) {
      const s = stack[i];
      let name = s?.getFileName();
      if (!name && s?.isEval()) {
        const origin = s?.getEvalOrigin();
        if (origin && typeof origin === "string") {
          const match = origin.match(/eval at \w+ \(([^)]+)\)/) || origin.match(/\(([^)]+)\)/) || [null, origin];
          const rawPath = match[1] || origin;
          name = rawPath.replace(/:\d+:\d+$/, "").replace(/:\d+$/, "");
        }
      }
      if (name && !name.includes("require-polyfill.ts") && !name.includes("module-runner.js")) {
        callerFile = name;
        break;
      }
    }
    if (!callerFile) return null;
    if (callerFile.startsWith("file://")) {
      try {
        callerFile = fileURLToPathFn(callerFile);
      } catch {
      }
    }
    return callerFile;
  } catch {
    return null;
  } finally {
    Error.prepareStackTrace = originalPrepare;
  }
}
if (typeof window === "undefined" && createRequireFn) {
  try {
    const defaultRequire = createRequireFn(import.meta.url);
    const dynamicRequire = function(id) {
      const callerFile = getCallerFile();
      if (callerFile) {
        let req = requireCache.get(callerFile);
        if (!req) {
          try {
            req = createRequireFn(callerFile);
            requireCache.set(callerFile, req);
          } catch {
            req = defaultRequire;
          }
        }
        return req(id);
      }
      return defaultRequire(id);
    };
    Object.setPrototypeOf(dynamicRequire, defaultRequire);
    for (const key of Object.getOwnPropertyNames(defaultRequire)) {
      try {
        const desc = Object.getOwnPropertyDescriptor(defaultRequire, key);
        if (desc) {
          Object.defineProperty(dynamicRequire, key, desc);
        }
      } catch {
      }
    }
    globalThis.require = dynamicRequire;
  } catch (e) {
    console.error("Failed to polyfill require:", e);
  }
}
let lastCapturedError;
const TTL_MS = 5e3;
function record(error) {
  if (!error) return;
  lastCapturedError = { error, at: Date.now() };
}
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record(event.error ?? event));
  globalThis.addEventListener(
    "unhandledrejection",
    (event) => record(event.reason)
  );
}
if (typeof process !== "undefined" && typeof process.on === "function") {
  process.on("uncaughtException", (err) => record(err));
  process.on("unhandledRejection", (reason) => record(reason));
}
try {
  const originalConsoleError = console.error;
  console.error = function(...args) {
    for (const arg of args) {
      if (arg instanceof Error) {
        record(arg);
      } else if (arg && typeof arg === "object" && ("message" in arg || "stack" in arg)) {
        record(arg);
      } else if (typeof arg === "string" && (arg.includes("Error") || arg.includes("stack"))) {
        record(new Error(arg));
      }
    }
    originalConsoleError.apply(console, args);
  };
  const originalConsoleWarn = console.warn;
  console.warn = function(...args) {
    for (const arg of args) {
      if (arg instanceof Error) {
        record(arg);
      }
    }
    originalConsoleWarn.apply(console, args);
  };
} catch (e) {
}
function consumeLastCapturedError() {
  if (!lastCapturedError) return void 0;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = void 0;
    return void 0;
  }
  const { error } = lastCapturedError;
  lastCapturedError = void 0;
  return error;
}
function renderErrorPage(error) {
  let errorDetails = "";
  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : "";
    errorDetails = `
      <div style="margin-top: 2rem; padding: 1.25rem; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 0.5rem; text-align: left; max-height: 25rem; overflow: auto; font-family: monospace; font-size: 0.8rem; color: #991b1b; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.05);">
        <strong style="display: block; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.7rem; tracking-wider; color: #dc2626;">Server-Side Diagnostic Error</strong>
        <div style="font-weight: bold; margin-bottom: 0.5rem; word-break: break-all;">${escapeHtml(message)}</div>
        ${stack ? `<pre style="white-space: pre-wrap; margin: 0; font-size: 0.75rem; line-height: 1.4; color: #7f1d1d; word-break: break-all;">${escapeHtml(stack)}</pre>` : ""}
      </div>
    `;
  }
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 32rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
      ${errorDetails}
    </div>
  </body>
</html>`;
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
let serverEntryPromise;
async function getServerEntry() {
  if (!serverEntryPromise) {
    serverEntryPromise = import("./assets/server-DAJe76I7.js").then((n) => n.a3).then(
      (m) => m.default ?? m
    );
  }
  return serverEntryPromise;
}
function brandedErrorResponse(error) {
  return new Response(renderErrorPage(error), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
function isCatastrophicSsrErrorBody(body, responseStatus) {
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }
  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }
  const fields = payload;
  const expectedKeys = /* @__PURE__ */ new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }
  return fields.unhandled === true && fields.message === "HTTPError" && (fields.status === void 0 || fields.status === responseStatus);
}
async function normalizeCatastrophicSsrResponse(response) {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;
  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }
  const err = consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`);
  console.error(err);
  return brandedErrorResponse(err);
}
const server = {
  async fetch(request, env, ctx) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse(error);
    }
  }
};
export {
  server as default,
  renderErrorPage as r
};
