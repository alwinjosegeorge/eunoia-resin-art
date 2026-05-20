import "@/lib/require-polyfill";
import { createFileRoute } from "@tanstack/react-router";

import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";

export const Route = createFileRoute("/api/products")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await connectToDatabase();
          const products = await Product.find({}).sort({ createdAt: -1 });
          return Response.json(products);
        } catch (error: any) {
          console.error("API Products GET error:", error);
          return Response.json({ error: error.message || "Failed to fetch products" }, { status: 500 });
        }
      },
      POST: async ({ request }: { request: Request }) => {
        try {
          await connectToDatabase();
          const body = await request.json();

          if (!body.id || !body.name || !body.category) {
            return Response.json({ error: "Missing required product fields" }, { status: 400 });
          }

          // Check if product with this ID already exists
          const existingProduct = await Product.findOne({ id: body.id });
          if (existingProduct) {
            return Response.json({ error: "Product with this ID/slug already exists" }, { status: 400 });
          }

          const newProduct = await Product.create({
            id: body.id,
            name: body.name,
            category: body.category,
            subtitle: body.subtitle,
            description: body.description,
            image: body.image,
            gallery: body.gallery || [],
            hoverImage: body.hoverImage,
            selectedSizes: body.selectedSizes || [],
            selectedDepths: body.selectedDepths || [],
            pricingMatrix: body.pricingMatrix || [],
            badge: body.badge,
            isFeatured: !!body.isFeatured,
            isSignatureCollection: !!body.isSignatureCollection,
            allowShipFlowers: body.allowShipFlowers !== false,
            allowUploadImages: body.allowUploadImages !== false,
            showProductionTime: body.showProductionTime !== false,
            showShipping: body.showShipping !== false,
            showPayment: body.showPayment !== false,
            status: body.status || "active",
            metaTitle: body.metaTitle,
            metaDesc: body.metaDesc,
            slug: body.slug || body.id,
            createdAt: body.createdAt ? new Date(body.createdAt) : new Date()
          });

          return Response.json(newProduct, { status: 201 });
        } catch (error: any) {
          console.error("API Products POST error:", error);
          return Response.json({ error: error.message || "Failed to create product" }, { status: 500 });
        }
      }
    }
  }
});
