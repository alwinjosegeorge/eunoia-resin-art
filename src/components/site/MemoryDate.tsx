import { useState } from "react";
import { format } from "date-fns";
import { Heart } from "lucide-react";

const occasions = ["Wedding", "Baby", "Anniversary", "Proposal"] as const;

export function MemoryDate() {
  const [type, setType] = useState<(typeof occasions)[number]>("Wedding");
  const [date, setDate] = useState<string>("");
  return (
    <div className="glass-card rounded-2xl p-7">
      <div className="text-[10px] tracking-[0.35em] uppercase text-gold mb-3">Memory Timeline</div>
      <h3 className="font-display text-2xl mb-4">When did this memory begin?</h3>
      <div className="flex flex-wrap gap-2 mb-5">
        {occasions.map((o) => (
          <button
            key={o}
            onClick={() => setType(o)}
            className={`px-4 py-1.5 rounded-full text-xs tracking-wide transition border ${
              type === o
                ? "bg-gold text-primary-foreground border-gold"
                : "border-border text-foreground/70 hover:border-gold"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none"
      />
      {date && (
        <div className="mt-6 p-5 rounded-xl bg-blush/50 border border-gold/30">
          <p className="font-serif text-xl italic text-foreground">
            Your {type.toLowerCase()} memory preserved from{" "}
            <span className="text-gold not-italic font-medium">
              {format(new Date(date), "MMMM d, yyyy")}
            </span>{" "}
            <Heart className="inline h-4 w-4 fill-gold text-gold" />
          </p>
        </div>
      )}
    </div>
  );
}
