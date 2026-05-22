const requireCache = new Map<string, NodeRequire>();

let createRequireFn: any = null;
let fileURLToPathFn: any = null;

if (typeof window === "undefined") {
  try {
    const reqFn = typeof require !== "undefined" ? require : null;
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

function getCallerFile(): string | null {
  if (typeof window !== "undefined") return null;
  if (!fileURLToPathFn) return null;

  const originalPrepare = Error.prepareStackTrace;
  try {
    Error.prepareStackTrace = (_, stack) => stack;
    const err = new Error();
    const stack = err.stack as unknown as any[];
    if (!stack) return null;
    
    // Find the first frame that represents the caller
    let callerFile: string | null = null;
    for (let i = 1; i < stack.length; i++) {
      const s = stack[i];
      let name = s?.getFileName();
      if (!name && s?.isEval()) {
        const origin = s?.getEvalOrigin();
        if (origin && typeof origin === "string") {
          // Eval origin is typically "eval at functionName (filename:line:col)"
          // or just the filename directly.
          const match = origin.match(/eval at \w+ \(([^)]+)\)/) || origin.match(/\(([^)]+)\)/) || [null, origin];
          const rawPath = match[1] || origin;
          // Strip line number and column number from the end (e.g. filename:8:18)
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
      } catch {}
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
    
    const dynamicRequire = function (this: any, id: string) {
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
    
    // Inherit properties from defaultRequire to mimic standard Node require
    Object.setPrototypeOf(dynamicRequire, defaultRequire);
    for (const key of Object.getOwnPropertyNames(defaultRequire)) {
      try {
        const desc = Object.getOwnPropertyDescriptor(defaultRequire, key);
        if (desc) {
          Object.defineProperty(dynamicRequire, key, desc);
        }
      } catch {}
    }
    
    (globalThis as any).require = dynamicRequire;
  } catch (e) {
    console.error("Failed to polyfill require:", e);
  }
}

export function initRequirePolyfill() {
  return typeof (globalThis as any).require === "function";
}

