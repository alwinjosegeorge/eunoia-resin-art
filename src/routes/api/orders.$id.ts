import { initRequirePolyfill } from "@/lib/require-polyfill";
initRequirePolyfill();
import { createFileRoute } from "@tanstack/react-router";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";
import { verifyApiRequest } from "@/lib/auth-middleware";
import { sanitizeImageField } from "@/lib/images";

export const Route = createFileRoute("/api/orders/$id")({
  server: {
    handlers: {
      GET: async ({ request, params }: { request: Request; params: any }) => {
        try {
          await connectToDatabase();
          const orderId = params?.id || new URL(request.url).pathname.split("/").pop();

          if (!orderId) {
            return Response.json({ success: false, error: "Missing order ID" }, { status: 400 });
          }

          const order = await Order.findOne({ id: orderId });
          if (!order) {
            return Response.json({ success: false, error: "Order not found" }, { status: 404 });
          }

          return Response.json({ success: true, data: order });
        } catch (error: any) {
          console.error(`API Order GET [${params?.id}] error:`, error);
          return Response.json({ success: false, error: error.message || "Failed to fetch order" }, { status: 500 });
        }
      },
      PUT: async ({ request, params }: { request: Request; params: any }) => {
        try {
          const isAuthorized = await verifyApiRequest(request);
          if (!isAuthorized) {
            return Response.json({ success: false, error: "Unauthorized access" }, { status: 401 });
          }

          await connectToDatabase();
          const orderId = params?.id || new URL(request.url).pathname.split("/").pop();

          if (!orderId) {
            return Response.json({ success: false, error: "Missing order ID" }, { status: 400 });
          }

          const body = await request.json();
          
          if (body.previewImage) {
            body.previewImage = sanitizeImageField(body.previewImage, body.productName || "order");
          }

          const existingOrder = await Order.findOne({ id: orderId });
          if (!existingOrder) {
            return Response.json({ success: false, error: "Order not found" }, { status: 404 });
          }

          if (body.status && body.status !== existingOrder.status) {
            const timeline = existingOrder.timeline || [];
            timeline.push({
              status: body.status,
              timestamp: new Date(),
              note: body.adminNotes || `Order transitioned to ${body.status}`
            });
            body.timeline = timeline;
          }

          const updatedOrder = await Order.findOneAndUpdate(
            { id: orderId },
            { $set: body },
            { new: true, runValidators: true }
          );

          return Response.json({ success: true, data: updatedOrder });
        } catch (error: any) {
          console.error(`API Order PUT [${params?.id}] error:`, error);
          return Response.json({ success: false, error: error.message || "Failed to update order" }, { status: 500 });
        }
      }
    }
  }
});
