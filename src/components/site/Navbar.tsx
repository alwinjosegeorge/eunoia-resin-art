import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, Menu, X, Package } from "lucide-react";
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
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Tracking modal states
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [trackingError, setTrackingError] = useState("");

  // Search overlay states
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Fetch products for global search
    fetch("/api/products")
      .then((res) => res.json())
      .then((resData) => {
        const data = resData.success ? resData.data : resData;
        if (Array.isArray(data)) {
          const activeOnly = data.filter((p: any) => {
            const s = p.status?.toLowerCase();
            return s === "active" || s === "featured" || !p.status;
          });
          setAllProducts(activeOnly);
        }
      })
      .catch((err) => console.error("Error loading products for global search:", err));
  }, []);

  const filteredProducts = searchQuery.trim() === "" 
    ? [] 
    : allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = trackingId.trim();
    if (!cleanId) {
      setTrackingError("Please enter a Tracking ID.");
      return;
    }
    if (!cleanId.startsWith("ERA-")) {
      setTrackingError("Invalid format. Tracking ID should start with 'ERA-'.");
      return;
    }
    setTrackingOpen(false);
    setTrackingId("");
    setTrackingError("");
    navigate({ to: `/track/${cleanId}` });
  };

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
          <button 
            onClick={() => setSearchOpen(true)}
            aria-label="Search" 
            className="text-foreground/70 hover:text-gold transition"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button aria-label="Wishlist" className="text-foreground/70 hover:text-gold transition">
            <Heart className="h-[18px] w-[18px]" />
          </button>
          <button 
            onClick={() => setTrackingOpen(true)}
            aria-label="Track Order" 
            className="text-foreground/70 hover:text-gold transition relative"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
          </button>
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

      {/* TRACKING MODAL */}
      {trackingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-background/90 border border-gold/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(201,161,74,0.15)] backdrop-blur-xl animate-in zoom-in-95 duration-300">
            {/* Close button */}
            <button 
              onClick={() => {
                setTrackingOpen(false);
                setTrackingError("");
              }}
              className="absolute top-5 right-5 text-foreground/50 hover:text-gold transition-colors"
              aria-label="Close tracking"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                <ShoppingBag className="h-5 w-5 text-gold" />
              </div>
              <h2 className="font-display text-2xl tracking-wide text-foreground">✦ Track Commission ✦</h2>
              <p className="text-xs text-muted-foreground mt-2 max-w-xs mx-auto leading-relaxed">
                Enter your 13-character Tracking ID (e.g., <span className="font-mono text-gold font-semibold">ERA-2026-6645</span>) sent to you after booking.
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} className="mt-6 space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="ERA-2026-XXXX"
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value.toUpperCase());
                    setTrackingError("");
                  }}
                  className={`w-full bg-secondary/40 border ${trackingError ? 'border-destructive' : 'border-border focus:border-gold'} rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 text-center font-mono tracking-widest uppercase outline-none transition duration-300`}
                  autoFocus
                />
                {trackingError && (
                  <p className="text-[11px] text-destructive text-center mt-1.5">{trackingError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-primary-foreground font-semibold rounded-full py-3.5 text-xs tracking-[0.2em] uppercase hover:opacity-95 transition-all shadow-gold"
              >
                Track Commission
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-lg animate-in fade-in duration-300">
          {/* Header area of search overlay */}
          <div className="border-b border-border/50 py-4 px-6 md:py-6">
            <div className="mx-auto max-w-3xl flex items-center justify-between gap-4">
              <div className="flex-1 flex items-center gap-3 bg-secondary/50 border border-border/60 rounded-full px-4 py-3 md:px-5">
                <Search className="h-5 w-5 text-gold shrink-0" />
                <input
                  type="text"
                  placeholder="Search our handcrafted resin collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow bg-transparent text-sm md:text-base text-foreground placeholder:text-muted-foreground/60 outline-none"
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-muted-foreground hover:text-foreground text-xs font-semibold px-1"
                  >
                    Clear
                  </button>
                )}
              </div>
              <button 
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-sm font-semibold tracking-wide text-foreground/80 hover:text-gold transition-colors flex items-center gap-1.5 shrink-0"
              >
                Close <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Results list */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto max-w-3xl">
              {searchQuery.trim() === "" ? (
                <div className="text-center py-12">
                  <div className="text-[10px] tracking-[0.4em] text-gold uppercase mb-2">Popular Categories</div>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["Teak Wood Frames", "Hoop Collection", "Hexagon Deepcast", "Coasters"].map((catName) => (
                      <button
                        key={catName}
                        onClick={() => {
                          setSearchQuery(catName);
                        }}
                        className="px-4 py-2 bg-secondary/40 border border-border/55 rounded-full text-xs text-foreground/80 hover:border-gold hover:text-gold transition-all"
                      >
                        {catName}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm font-medium">No unique pieces match "{searchQuery}"</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Try checking your spelling or search for another term.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs text-muted-foreground/80 border-b border-border/40 pb-2">
                    <span>Found {filteredProducts.length} matching pieces</span>
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        const query = searchQuery;
                        setSearchQuery("");
                        navigate({ to: "/shop", search: { q: query } as any });
                      }}
                      className="text-gold font-semibold hover:underline"
                    >
                      View all in Shop →
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {filteredProducts.slice(0, 8).map((p) => (
                      <Link
                        key={p.id}
                        to="/product/$id"
                        params={{ id: p.id }}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex gap-4 p-3 bg-secondary/20 hover:bg-secondary/40 border border-border/30 hover:border-gold/30 rounded-2xl transition duration-300 group"
                      >
                        <div className="h-16 w-16 rounded-xl overflow-hidden bg-secondary shrink-0">
                          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                          <span className="text-[10px] tracking-widest uppercase text-gold font-medium truncate">{p.category}</span>
                          <h4 className="font-semibold text-sm text-foreground mt-0.5 group-hover:text-gold transition-colors truncate">{p.name}</h4>
                          <span className="text-xs text-muted-foreground font-medium mt-0.5">
                            {p.pricingMatrix?.[0]?.price ? `From ₹${Number(p.pricingMatrix[0].price).toLocaleString("en-IN")}` : `₹${Number(p.previewPrice || 0).toLocaleString("en-IN")}`}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {filteredProducts.length > 8 && (
                    <div className="text-center pt-4">
                      <button
                        onClick={() => {
                          setSearchOpen(false);
                          const query = searchQuery;
                          setSearchQuery("");
                          navigate({ to: "/shop", search: { q: query } as any });
                        }}
                        className="px-6 py-3 border border-gold text-gold font-medium rounded-full text-xs tracking-widest uppercase hover:bg-gold hover:text-primary-foreground transition-all"
                      >
                        View All {filteredProducts.length} Results
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
