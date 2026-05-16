import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";

const FALLBACKS = [
  "Some flowers never fade, because the memories they hold never die.",
  "What we love deeply becomes a part of us — held forever in resin and light.",
  "Every petal is a heartbeat preserved, every gold flake a whispered vow.",
  "Time may pass, but a moment poured in resin belongs to forever.",
  "The bloom fades, the memory stays — caught in crystal, framed in gold.",
];

export const Route = createFileRoute("/api/memory-quote")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        let story = "";
        try {
          const body = (await request.json()) as { story?: string };
          story = (body.story ?? "").slice(0, 1000);
        } catch {}

        const quote = FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
        return Response.json({ quote });
      },
    },
  },
});
