async function checkHeaders() {
  try {
    const res = await fetch("https://eunoia-resin-art.vercel.app/api/health");
    console.log("Status:", res.status);
    console.log("\n--- HEADERS ---");
    for (const [key, value] of res.headers.entries()) {
      console.log(`${key}: ${value}`);
    }
  } catch (e) {
    console.error(e);
  }
}
checkHeaders();
