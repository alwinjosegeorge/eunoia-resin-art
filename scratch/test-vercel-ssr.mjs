import handler from "../.vercel/output/functions/index.func/index.js";

// Mock response object
class MockResponse {
  constructor() {
    this.statusCode = 200;
    this.statusMessage = "OK";
    this.headers = {};
    this.bodyChunks = [];
  }

  setHeader(key, value) {
    this.headers[key] = value;
  }

  write(chunk) {
    this.bodyChunks.push(chunk);
  }

  end(finalChunk) {
    if (finalChunk) this.bodyChunks.push(finalChunk);
    const bodyStr = this.bodyChunks.map(c => Buffer.from(c).toString("utf-8")).join("");
    console.log("\n--- RESPONSE HEADERS ---");
    console.log(JSON.stringify(this.headers, null, 2));
    console.log("\n--- STATUS ---");
    console.log(`${this.statusCode} ${this.statusMessage}`);
    
    import("node:fs").then(fs => {
      fs.writeFileSync("scratch/clean-ssr.html", bodyStr, "utf8");
      console.log("\n✅ HTML written to scratch/clean-ssr.html");
      process.exit(0);
    });
  }
}

// Mock request object
const req = {
  url: "/",
  method: "GET",
  headers: {
    host: "localhost:3000",
    "x-forwarded-proto": "http",
  },
};

const res = new MockResponse();

console.log("Invoking Vercel SSR handler for URL '/'...");
handler(req, res).catch(err => {
  console.error("Handler promise rejected:", err);
  process.exit(1);
});
