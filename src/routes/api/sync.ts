import "@/lib/require-polyfill";
import { createFileRoute } from "@tanstack/react-router";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { verifyApiRequest } from "@/lib/auth-middleware";
import { sanitizeImageField, sanitizeGalleryFields } from "@/lib/images";

export const Route = createFileRoute("/api/sync")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const isAuthorized = await verifyApiRequest(request);
          if (!isAuthorized) {
            return Response.json({ success: false, error: "Unauthorized access" }, { status: 401 });
          }

          await connectToDatabase();
          const { orders = [], products = [] } = await request.json();

          let syncedOrdersCount = 0;
          let syncedProductsCount = 0;

          // 1. Sync Orders
          for (const orderData of orders) {
            if (!orderData.id) continue;
            
            const existingOrder = await Order.findOne({ id: orderData.id });
            if (!existingOrder) {
              const initialStatus = orderData.status || "Order Received";
              const timeline = orderData.timeline || [
                {
                  status: initialStatus,
                  timestamp: orderData.createdAt ? new Date(orderData.createdAt) : new Date(),
                  note: "Order initialized during synchronization."
                }
              ];

              await Order.create({
                id: orderData.id,
                customerName: orderData.customerName,
                customerPhone: orderData.customerPhone,
                customerWhatsapp: orderData.customerWhatsapp,
                productName: orderData.productName,
                depth: orderData.depth,
                price: Number(orderData.price) || 0,
                submissionMethod: orderData.submissionMethod,
                shippingDate: orderData.shippingDate,
                notes: orderData.notes,
                address: orderData.address,
                status: initialStatus,
                expectedCompletionDate: orderData.expectedCompletionDate,
                previewImage: sanitizeImageField(orderData.previewImage, orderData.productName),
                adminNotes: orderData.adminNotes,
                courierDetails: orderData.courierDetails,
                createdAt: orderData.createdAt ? new Date(orderData.createdAt) : new Date(),
                timeline: timeline
              });
              syncedOrdersCount++;
            }
          }

          // 2. Sync Products
          for (const productData of products) {
            if (!productData.id) continue;

            const existingProduct = await Product.findOne({ id: productData.id });
            if (!existingProduct) {
              await Product.create({
                id: productData.id,
                name: productData.name,
                category: productData.category,
                subtitle: productData.subtitle,
                description: productData.description,
                image: sanitizeImageField(productData.image, productData.category),
                gallery: sanitizeGalleryFields(productData.gallery, productData.category),
                hoverImage: sanitizeImageField(productData.hoverImage, productData.category),
                selectedSizes: productData.selectedSizes || [],
                selectedDepths: productData.selectedDepths || [],
                pricingMatrix: productData.pricingMatrix || [],
                badge: productData.badge,
                isFeatured: !!productData.isFeatured,
                isSignatureCollection: !!productData.isSignatureCollection,
                allowShipFlowers: productData.allowShipFlowers !== false,
                allowUploadImages: productData.allowUploadImages !== false,
                showProductionTime: productData.showProductionTime !== false,
                showShipping: productData.showShipping !== false,
                showPayment: productData.showPayment !== false,
                status: productData.status || "active",
                metaTitle: productData.metaTitle,
                metaDesc: productData.metaDesc,
                slug: productData.slug || productData.id,
                createdAt: productData.createdAt ? new Date(productData.createdAt) : new Date()
              });
              syncedProductsCount++;
            }
          }

          return Response.json({
            success: true,
            data: {
              syncedOrders: syncedOrdersCount,
              syncedProducts: syncedProductsCount,
            },
            message: `Successfully synced ${syncedOrdersCount} orders and ${syncedProductsCount} products!`
          });
        } catch (error: any) {
          console.error("API Sync error:", error);
          return Response.json({ success: false, error: error.message || "Failed to sync data" }, { status: 500 });
        }
      }
    }
  }
});
