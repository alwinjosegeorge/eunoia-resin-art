import "@/lib/require-polyfill";
import { createFileRoute } from "@tanstack/react-router";
import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const startTime = Date.now();
          await connectToDatabase();
          const latency = Date.now() - startTime;
          const isConnected = mongoose.connection.readyState === 1;
          
          return Response.json({
            success: true,
            status: isConnected ? "UP" : "DOWN",
            connectionState: mongoose.connection.readyState,
            timestamp: new Date().toISOString(),
            mongodb: isConnected ? "Connected" : "Disconnected",
            latencyMs: latency,
            environment: process.env.NODE_ENV || "development",
          });
        } catch (error: any) {
          console.error("Healthcheck database connection error:", error);
          return Response.json(
            {
              success: false,
              status: "DOWN",
              timestamp: new Date().toISOString(),
              error: error.message || "Failed to connect to MongoDB",
              stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
            },
            { status: 500 }
          );
        }
      },
    },
  },
});
