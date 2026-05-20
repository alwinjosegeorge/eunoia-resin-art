async function run() {
  try {
    const res = await fetch("http://localhost:4173/api/health");
    const body = await res.text();
    console.log("Status:", res.status);
    console.log("Body:", body);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
