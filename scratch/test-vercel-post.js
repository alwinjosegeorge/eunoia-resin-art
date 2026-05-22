async function testPost() {
  try {
    const mockOrder = {
      id: `ERA-2026-TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: "Vercel API Test Bot",
      customerPhone: "9876543210",
      customerWhatsapp: "9876543210",
      productName: "9x12 Teak Frame",
      depth: "15mm",
      price: 4001,
      submissionMethod: "upload",
      notes: "Test mock submission from environment.",
      address: {
        house: "Vercel Test Apt 1",
        area: "Vercel Cloud Street",
        district: "Calicut",
        state: "Kerala",
        pin: "673602"
      },
      status: "Order Received"
    };

    console.log("Sending POST to /api/orders with order ID:", mockOrder.id);
    const res = await fetch("https://eunoia-resin-art.vercel.app/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mockOrder)
    });

    console.log("Response status:", res.status);
    const body = await res.json();
    console.log("Response body:", JSON.stringify(body, null, 2));
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

testPost();
