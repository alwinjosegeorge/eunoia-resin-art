import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/custom", label: "Custom Order" },
  { to: "/wedding", label: "Wedding" },
  { to: "/about", label: "Our Story" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Eunoia Resin Art" className="h-9 w-9 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-lg tracking-wide">Eunoia</div>
            <div className="text-[9px] tracking-[0.35em] text-gold uppercase -mt-0.5">Resin Art</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[13px] tracking-wide text-foreground/80 hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-foreground/70 hover:text-gold transition">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button aria-label="Wishlist" className="text-foreground/70 hover:text-gold transition">
            <Heart className="h-[18px] w-[18px]" />
          </button>
          <Link to="/checkout" aria-label="Cart" className="text-foreground/70 hover:text-gold transition relative">
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="absolute -top-2 -right-2 grid place-items-center h-4 w-4 rounded-full bg-gold text-[9px] text-primary-foreground">
              2
            </span>
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden ml-1 text-foreground/80"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass-nav mt-3 px-6 py-5 space-y-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block text-sm tracking-wide"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
