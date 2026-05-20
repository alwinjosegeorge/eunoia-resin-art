import { createFileRoute } from "@tanstack/react-router";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";

export const Route = createFileRoute("/api/products/$id")({
  server: {
    handlers: {
      GET: async ({ request, params }: { request: Request; params: any }) => {
        try {
          await connectToDatabase();
          const productId = params?.id || new URL(request.url).pathname.split("/").pop();

          if (!productId) {
            return Response.json({ error: "Missing product ID" }, { status: 400 });
          }

          const product = await Product.findOne({ id: productId });
          if (!product) {
            return Response.json({ error: "Product not found" }, { status: 404 });
          }

          return Response.json(product);
        } catch (error: any) {
          console.error(`API Product GET [${params?.id}] error:`, error);
          return Response.json({ error: error.message || "Failed to fetch product" }, { status: 500 });
        }
      },
      PUT: async ({ request, params }: { request: Request; params: any }) => {
        try {
          await connectToDatabase();
          const productId = params?.id || new URL(request.url).pathname.split("/").pop();

          if (!productId) {
            return Response.json({ error: "Missing product ID" }, { status: 400 });
          }

          const body = await request.json();

          const updatedProduct = await Product.findOneAndUpdate(
            { id: productId },
            { $set: body },
            { new: true, runValidators: true }
          );

          if (!updatedProduct) {
            return Response.json({ error: "Product not found or update failed" }, { status: 404 });
          }

          return Response.json(updatedProduct);
        } catch (error: any) {
          console.error(`API Product PUT [${params?.id}] error:`, error);
          return Response.json({ error: error.message || "Failed to update product" }, { status: 500 });
        }
      },
      DELETE: async ({ request, params }: { request: Request; params: any }) => {
        try {
          await connectToDatabase();
          const productId = params?.id || new URL(request.url).pathname.split("/").pop();

          if (!productId) {
            return Response.json({ error: "Missing product ID" }, { status: 400 });
          }

          const deletedProduct = await Product.findOneAndDelete({ id: productId });

          if (!deletedProduct) {
            return Response.json({ error: "Product not found" }, { status: 404 });
          }

          return Response.json({ message: "Product deleted successfully", id: productId });
        } catch (error: any) {
          console.error(`API Product DELETE [${params?.id}] error:`, error);
          return Response.json({ error: error.message || "Failed to delete product" }, { status: 500 });
        }
      }
    }
  }
});
