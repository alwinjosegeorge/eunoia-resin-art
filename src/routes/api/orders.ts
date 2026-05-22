import { initRequirePolyfill } from "@/lib/require-polyfill";
initRequirePolyfill();
import { createFileRoute } from "@tanstack/react-router";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";
import { verifyApiRequest } from "@/lib/auth-middleware";
import { sanitizeImageField } from "@/lib/images";

export const Route = createFileRoute("/api/orders")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await connectToDatabase();
          const orders = await Order.find({}).sort({ createdAt: -1 });
          return Response.json({ success: true, data: orders });
        } catch (error: any) {
          console.error("API Orders GET error:", error);
          return Response.json({ success: false, error: error.message || "Failed to fetch orders" }, { status: 500 });
        }
      },
      POST: async ({ request }: { request: Request }) => {
        try {
          await connectToDatabase();
          const body = await request.json();
          
          if (!body.id || !body.customerName || !body.customerPhone) {
            return Response.json({ success: false, error: "Missing required order fields" }, { status: 400 });
          }

          const initialStatus = body.status || "Order Received";
          const timeline = [
            {
              status: initialStatus,
              timestamp: new Date(),
              note: body.notes || "Order placed successfully."
            }
          ];

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
            status: initialStatus,
            expectedCompletionDate: body.expectedCompletionDate,
            previewImage: sanitizeImageField(body.previewImage, body.productName),
            adminNotes: body.adminNotes,
            courierDetails: body.courierDetails,
            preBookingKit: body.preBookingKit || false,
            kitPrice: Number(body.kitPrice) || 0,
            kitStatus: body.kitStatus || "",
            createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
            timeline: timeline
          });

          return Response.json({ success: true, data: newOrder }, { status: 201 });
        } catch (error: any) {
          console.error("API Orders POST error:", error);
          return Response.json({ success: false, error: error.message || "Failed to create order" }, { status: 500 });
        }
      }
    }
  }
});
