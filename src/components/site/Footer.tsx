import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="h-10 w-10" />
            <div>
              <div className="font-display text-xl">Eunoia</div>
              <div className="text-[9px] tracking-[0.35em] text-gold uppercase">Resin Art</div>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm text-muted-foreground leading-relaxed">
            Every piece is an alchemy of time, nature, and emotion — handcrafted with soul by Manjima in her boutique Calicut studio.
          </p>
          <div className="mt-5 flex items-center gap-4 text-muted-foreground">
            <a href="https://www.instagram.com/eunoiaa____aa_resin_art_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold transition"><Instagram className="h-4 w-4" /></a>
            <a href="mailto:eunoia.resinstudio@gmail.com" className="hover:text-gold transition"><Mail className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] tracking-[0.35em] uppercase text-gold mb-5">Discover</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/shop" className="hover:text-gold transition">Shop All</Link></li>
            <li><Link to="/custom" className="hover:text-gold transition">Custom Order</Link></li>
            <li><Link to="/wedding" className="hover:text-gold transition">Wedding Preservation</Link></li>
            <li><Link to="/about" className="hover:text-gold transition">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] tracking-[0.35em] uppercase text-gold mb-5">Care</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/faq" className="hover:text-gold transition">FAQ</Link></li>
            <li><a href="#" className="hover:text-gold transition">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-gold transition">Resin Aftercare</a></li>
            <li><a href="#" className="hover:text-gold transition">Privacy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] tracking-[0.35em] uppercase text-gold mb-5">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-4">First access to private collection drops.</p>
          <form className="flex border-b border-foreground/30 pb-1">
            <input
              type="email"
              required
              placeholder="email@example.com"
              className="flex-1 bg-transparent text-sm py-2 outline-none placeholder:text-muted-foreground/70"
            />
            <button className="text-gold text-sm font-medium tracking-wide">JOIN →</button>
          </form>
          <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mt-0.5 shrink-0 text-gold" />
            Jayanthi Nivas (H), Mukkam (PO), Calicut — 673602, Kerala
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © Eunoia Resin Art. Handcrafted with soul by Manjima.
        <div style={{ marginTop: "8px" }}>
          <a
            href="https://codexorastudio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "11px",
              letterSpacing: "0.08em",
              opacity: 0.7,
              transition: "opacity 0.3s ease",
              textDecoration: "none",
              color: "inherit",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
          >
            Designed &amp; Developed by <span style={{ color: "#1a1a1a", fontWeight: 600 }}>Codexora Studio</span> ✦
          </a>
        </div>
      </div>
    </footer>
  );
}
