// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  if (!error) return;
  lastCapturedError = { error, at: Date.now() };
}

// 1. Listen to global uncaught errors and unhandled rejections
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

if (typeof process !== "undefined" && typeof process.on === "function") {
  process.on("uncaughtException", (err) => record(err));
  process.on("unhandledRejection", (reason) => record(reason));
}

// 2. Monkey-patch console.error and console.warn to intercept swallowed errors
try {
  const originalConsoleError = console.error;
  console.error = function (...args: any[]) {
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
  console.warn = function (...args: any[]) {
    for (const arg of args) {
      if (arg instanceof Error) {
        record(arg);
      }
    }
    originalConsoleWarn.apply(console, args);
  };
} catch (e) {
  // Silent fallback
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}

