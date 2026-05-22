async function run() {
  try {
    const res = await fetch("https://eunoia-resin-art.vercel.app/");
    const text = await res.text();
    console.log("Status:", res.status);
    
    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    console.log("\n--- SCRIPTS FOUND IN LIVE HTML ---");
    while ((match = scriptRegex.exec(text)) !== null) {
      console.log(match[0].slice(0, 500));
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
