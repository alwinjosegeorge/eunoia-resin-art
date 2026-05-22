async function testHealth() {
  try {
    console.log("Calling health endpoint...");
    const res = await fetch("https://eunoia-resin-art.vercel.app/api/health");
    console.log("Health status:", res.status);
    const body = await res.json();
    console.log("Health body:", JSON.stringify(body, null, 2));
  } catch (err) {
    console.error("Health error:", err);
  }
}
testHealth();
