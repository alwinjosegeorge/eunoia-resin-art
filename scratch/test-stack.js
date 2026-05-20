import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const requireCache = new Map();

function getCallerFile() {
  const originalPrepare = Error.prepareStackTrace;
  try {
    Error.prepareStackTrace = (_, stack) => stack;
    const err = new Error();
    const stack = err.stack;
    if (!stack || stack.length < 2) return null;
    
    // Let's print the entire stack to see
    console.log("Stack files:");
    for (let i = 0; i < stack.length; i++) {
      console.log(`  [${i}]: ${stack[i].getFileName()}`);
    }
    
    let callerFile = stack[2]?.getFileName();
    if (!callerFile) return null;
    
    if (callerFile.startsWith("file://")) {
      try {
        callerFile = fileURLToPath(callerFile);
      } catch {}
    }
    return callerFile;
  } catch {
    return null;
  } finally {
    Error.prepareStackTrace = originalPrepare;
  }
}

globalThis.require = function (id) {
  const caller = getCallerFile();
  console.log(`require("${id}") called by: ${caller}`);
  return `loaded ${id}`;
};

// Test it
function testCall() {
  require("foo");
}

testCall();
