import { createRequire } from "node:module";

if (typeof globalThis.require === "undefined") {
  try {
    (globalThis as any).require = createRequire(import.meta.url);
  } catch (e) {
    console.error("Failed to polyfill require:", e);
  }
}
