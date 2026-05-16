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

        const key = process.env.GEMINI_API_KEY;
        if (!key || !story.trim()) {
          const quote = FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
          return Response.json({ quote });
        }

        try {
          const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { text: "You write one short, original, emotionally evocative quote (max 18 words) about love, memory, and preservation in elegant poetic English. No quotation marks, no attribution, just the quote.\n\nStory: " + story + "\n\nWrite one luxurious emotional quote inspired by this memory." }
                  ]
                }
              ]
            }),
          });
          const data = await r.json() as any;
          const quoteText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          const quote = quoteText ? quoteText.trim().replace(/^["']|["']$/g, "") : FALLBACKS[0];
          return Response.json({ quote });
        } catch {
          return Response.json({ quote: FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)] });
        }
      },
    },
  },
});
