import { useState } from "react";
import { format } from "date-fns";
import { Heart, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const occasions = ["Wedding", "Baby", "Anniversary", "Proposal"] as const;

export function MemoryDate() {
  const [type, setType] = useState<(typeof occasions)[number]>("Wedding");
  const [date, setDate] = useState<Date>();

  return (
    <div className="glass-card rounded-2xl p-7 max-w-md mx-auto">
      <div className="text-[10px] tracking-[0.35em] uppercase text-gold mb-3 text-left">Memory Timeline</div>
      <h3 className="font-display text-2xl mb-6 text-left">When did this memory begin?</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {occasions.map((o) => (
          <button
            key={o}
            onClick={() => setType(o)}
            className={`px-4 py-1.5 rounded-full text-xs tracking-wide transition border ${
              type === o
                ? "bg-gold text-primary-foreground border-gold shadow-[0_0_10px_rgba(201,161,74,0.3)]"
                : "border-border text-foreground/70 hover:border-gold hover:text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "w-full flex items-center justify-start text-left font-normal bg-secondary/30 border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none hover:border-gold transition-colors",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-3 h-4 w-4 text-gold" />
            {date ? format(date, "MMMM d, yyyy") : <span className="tracking-wide">Pick a memorable date</span>}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-border shadow-soft" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className="rounded-xl"
          />
        </PopoverContent>
      </Popover>

      {date && (
        <div className="mt-6 p-5 rounded-xl bg-blush/50 border border-gold/30 animate-in fade-in slide-in-from-top-2 text-left">
          <p className="font-serif text-lg leading-snug text-foreground">
            Your <span className="lowercase">{type}</span> memory preserved from<br/>
            <span className="text-gold not-italic font-medium text-xl mt-1 block">
              {format(date, "MMMM d, yyyy")}
            </span>
          </p>
          <div className="mt-3 text-[10px] tracking-widest uppercase text-muted-foreground flex items-center gap-2">
            <Heart className="h-3 w-3 fill-gold text-gold" /> Eternal Keepsake
          </div>
        </div>
      )}
    </div>
  );
}
