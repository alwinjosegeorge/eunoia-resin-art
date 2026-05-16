import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const url = "https://wa.me/917591947287?text=Hi%20Manjima%2C%20I%27d%20love%20to%20preserve%20a%20memory%20into%20resin%20art.";
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="glass-card rounded-2xl p-4 max-w-[260px] shadow-soft animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between gap-3">
            <p className="font-serif italic text-[15px] leading-snug">
              Need help preserving your memories?
            </p>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block text-center bg-gold text-primary-foreground rounded-full px-4 py-2 text-xs tracking-wide hover:opacity-90"
          >
            Chat with Manjima
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="grid place-items-center h-14 w-14 rounded-full bg-gold text-primary-foreground shadow-gold hover:scale-105 transition"
        aria-label="WhatsApp consultation"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}
