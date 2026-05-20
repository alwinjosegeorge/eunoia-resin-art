import { createFileRoute } from "@tanstack/react-router";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";

export const Route = createFileRoute("/api/orders/$id")({
  server: {
    handlers: {
      GET: async ({ request, params }: { request: Request; params: any }) => {
        try {
          await connectToDatabase();
          // Extract order ID, supporting both framework params and fallback URL parsing
          const orderId = params?.id || new URL(request.url).pathname.split("/").pop();

          if (!orderId) {
            return Response.json({ error: "Missing order ID" }, { status: 400 });
          }

          const order = await Order.findOne({ id: orderId });
          if (!order) {
            return Response.json({ error: "Order not found" }, { status: 404 });
          }

          return Response.json(order);
        } catch (error: any) {
          console.error(`API Order GET [${params?.id}] error:`, error);
          return Response.json({ error: error.message || "Failed to fetch order" }, { status: 500 });
        }
      },
      PUT: async ({ request, params }: { request: Request; params: any }) => {
        try {
          await connectToDatabase();
          const orderId = params?.id || new URL(request.url).pathname.split("/").pop();

          if (!orderId) {
            return Response.json({ error: "Missing order ID" }, { status: 400 });
          }

          const body = await request.json();
          
          const updatedOrder = await Order.findOneAndUpdate(
            { id: orderId },
            { $set: body },
            { new: true, runValidators: true }
          );

          if (!updatedOrder) {
            return Response.json({ error: "Order not found or update failed" }, { status: 404 });
          }

          return Response.json(updatedOrder);
        } catch (error: any) {
          console.error(`API Order PUT [${params?.id}] error:`, error);
          return Response.json({ error: error.message || "Failed to update order" }, { status: 500 });
        }
      }
    }
  }
});
