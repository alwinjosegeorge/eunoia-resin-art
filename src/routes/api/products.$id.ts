import "@/lib/require-polyfill";
import { createFileRoute } from "@tanstack/react-router";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { verifyApiRequest } from "@/lib/auth-middleware";
import { sanitizeImageField, sanitizeGalleryFields } from "@/lib/images";

export const Route = createFileRoute("/api/products/$id")({
  server: {
    handlers: {
      GET: async ({ request, params }: { request: Request; params: any }) => {
        try {
          await connectToDatabase();
          const productId = params?.id || new URL(request.url).pathname.split("/").pop();

          if (!productId) {
            return Response.json({ success: false, error: "Missing product ID" }, { status: 400 });
          }

          const product = await Product.findOne({ id: productId });
          if (!product) {
            return Response.json({ success: false, error: "Product not found" }, { status: 404 });
          }

          return Response.json({ success: true, data: product });
        } catch (error: any) {
          console.error(`API Product GET [${params?.id}] error:`, error);
          return Response.json({ success: false, error: error.message || "Failed to fetch product" }, { status: 500 });
        }
      },
      PUT: async ({ request, params }: { request: Request; params: any }) => {
        try {
          const isAuthorized = await verifyApiRequest(request);
          if (!isAuthorized) {
            return Response.json({ success: false, error: "Unauthorized access" }, { status: 401 });
          }

          await connectToDatabase();
          const productId = params?.id || new URL(request.url).pathname.split("/").pop();

          if (!productId) {
            return Response.json({ success: false, error: "Missing product ID" }, { status: 400 });
          }

          const body = await request.json();

          // Image base64 checks and sanitization
          if (body.image) {
            body.image = sanitizeImageField(body.image, body.category || "product");
          }
          if (body.gallery) {
            body.gallery = sanitizeGalleryFields(body.gallery, body.category || "product");
          }
          if (body.hoverImage) {
            body.hoverImage = sanitizeImageField(body.hoverImage, body.category || "product");
          }

          const updatedProduct = await Product.findOneAndUpdate(
            { id: productId },
            { $set: body },
            { new: true, runValidators: true }
          );

          if (!updatedProduct) {
            return Response.json({ success: false, error: "Product not found or update failed" }, { status: 404 });
          }

          return Response.json({ success: true, data: updatedProduct });
        } catch (error: any) {
          console.error(`API Product PUT [${params?.id}] error:`, error);
          return Response.json({ success: false, error: error.message || "Failed to update product" }, { status: 500 });
        }
      },
      DELETE: async ({ request, params }: { request: Request; params: any }) => {
        try {
          const isAuthorized = await verifyApiRequest(request);
          if (!isAuthorized) {
            return Response.json({ success: false, error: "Unauthorized access" }, { status: 401 });
          }

          await connectToDatabase();
          const productId = params?.id || new URL(request.url).pathname.split("/").pop();

          if (!productId) {
            return Response.json({ success: false, error: "Missing product ID" }, { status: 400 });
          }

          const deletedProduct = await Product.findOneAndDelete({ id: productId });

          if (!deletedProduct) {
            return Response.json({ success: false, error: "Product not found" }, { status: 404 });
          }

          return Response.json({ success: true, data: { id: productId }, message: "Product deleted successfully" });
        } catch (error: any) {
          console.error(`API Product DELETE [${params?.id}] error:`, error);
          return Response.json({ success: false, error: error.message || "Failed to delete product" }, { status: 500 });
        }
      }
    }
  }
});
