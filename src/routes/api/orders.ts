import { createFileRoute } from "@tanstack/react-router";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";

export const Route = createFileRoute("/api/orders")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await connectToDatabase();
          const orders = await Order.find({}).sort({ createdAt: -1 });
          return Response.json(orders);
        } catch (error: any) {
          console.error("API Orders GET error:", error);
          return Response.json({ error: error.message || "Failed to fetch orders" }, { status: 500 });
        }
      },
      POST: async ({ request }: { request: Request }) => {
        try {
          await connectToDatabase();
          const body = await request.json();
          
          if (!body.id || !body.customerName || !body.customerPhone) {
            return Response.json({ error: "Missing required order fields" }, { status: 400 });
          }

          // Create the order in the database
          const newOrder = await Order.create({
            id: body.id,
            customerName: body.customerName,
            customerPhone: body.customerPhone,
            customerWhatsapp: body.customerWhatsapp,
            productName: body.productName,
            depth: body.depth,
            price: Number(body.price),
            submissionMethod: body.submissionMethod,
            shippingDate: body.shippingDate,
            notes: body.notes,
            address: body.address,
            status: body.status || "Order Received",
            expectedCompletionDate: body.expectedCompletionDate,
            previewImage: body.previewImage,
            adminNotes: body.adminNotes,
            courierDetails: body.courierDetails,
            createdAt: body.createdAt ? new Date(body.createdAt) : new Date()
          });

          return Response.json(newOrder, { status: 201 });
        } catch (error: any) {
          console.error("API Orders POST error:", error);
          return Response.json({ error: error.message || "Failed to create order" }, { status: 500 });
        }
      }
    }
  }
});
