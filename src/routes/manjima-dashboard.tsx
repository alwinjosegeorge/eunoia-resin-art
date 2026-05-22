import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  Lock, PackageSearch, PackageOpen, Droplets, PackageCheck, Package,
  Search, ChevronRight, CheckCircle2, Calendar as CalendarIcon,
  X, Plus, Pencil, Trash2, LayoutGrid, ArrowLeft, LogOut, ChevronDown,
  Database, RefreshCw, Upload
} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/manjima-dashboard")({
  component: DashboardPage,
});

const ALL_STAGES = [
  "Order Received", "Waiting For Flowers", "Waiting For Images",
  "Flowers Received", "Design Planning", "Resin Casting", "Drying Process",
  "Finishing & Polishing", "Ready For Dispatch", "Shipped", "Delivered",
];

const FRAME_SIZES  = ["5x5","6x6","8 inch","8 inch Round","9x12","10 inch","10x12","12x12","12x16"];
const DEPTHS       = ["10mm","15mm","20mm","30mm","35mm","50mm"];
const CATEGORIES   = ["Teak Frame","Pine Frame","Hoop","Hexagon","Clock","Agate","Deepcast","Baby Keepsake","Moon Art","Other"];
const PROD_STATUS  = ["Active","Draft","Hidden","Sold Out"];

const inp = "w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors";
const lbl = "text-[10px] tracking-widest uppercase text-muted-foreground font-medium";

function Card({ title, label, children }: { title: string; label: string; children: React.ReactNode }) {
  return (
    <section className="glass-card rounded-2xl border border-border p-5 md:p-8">
      <div className="flex items-center gap-3 border-b border-border pb-4 mb-5">
        <span className="text-base">{title}</span>
        <span className="text-[10px] tracking-[0.35em] uppercase font-semibold text-foreground">{label}</span>
      </div>
      {children}
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-2">
        <label className={lbl}>{label}</label>
        {hint && <span className="text-[9px] text-muted-foreground/60 italic">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <span className="text-sm text-foreground/80 flex-1">{label}</span>
      <button onClick={() => onChange(!value)}
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-300 ${value ? "bg-gold" : "bg-border"}`}>
        <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${value ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

type PricingRow = { size: string; depth: string; price: string };
type SavedProduct = {
  id: string; name: string; category: string; subtitle: string; description: string;
  image?: string;
  gallery?: string[];
  hoverImage?: string;
  selectedSizes: string[]; selectedDepths: string[]; pricingMatrix: PricingRow[];
  badge: string; isFeatured: boolean; isSignatureCollection: boolean;
  allowShipFlowers: boolean; allowUploadImages: boolean;
  showProductionTime: boolean; showShipping: boolean; showPayment: boolean;
  status: string; metaTitle: string; metaDesc: string; slug: string; createdAt: string;
};

async function parseFetchError(res: Response, defaultMsg: string): Promise<string> {
  try {
    const errData = await res.json();
    return errData.error || defaultMsg;
  } catch {
    try {
      const errText = await res.text();
      return `Server Error (${res.status}): ${errText.slice(0, 150)}`;
    } catch {
      return `Server Error (${res.status})`;
    }
  }
}

function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [mobileOrderOpen, setMobileOrderOpen] = useState(false);
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [productView, setProductView] = useState<"list" | "form">("list");
  const [editingProduct, setEditingProduct] = useState<SavedProduct | null>(null);

  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  const fetchDbData = async () => {
    setLoading(true);
    setDashboardError(null);
    try {
      const ordersRes = await fetch("/api/orders");
      const ordersData = await ordersRes.json();
      if (ordersRes.ok && ordersData.success !== false) {
        setOrders(ordersData.success ? ordersData.data : ordersData);
      } else {
        const errMsg = ordersData.error || "Failed to load orders from MongoDB.";
        setDashboardError(errMsg);
        console.error(errMsg);
      }
      
      const productsRes = await fetch("/api/products");
      const productsData = await productsRes.json();
      if (productsRes.ok && productsData.success !== false) {
        setSavedProducts(productsData.success ? productsData.data : productsData);
      } else {
        const errMsg = productsData.error || "Failed to load products from MongoDB.";
        setDashboardError(prev => prev || errMsg);
        console.error(errMsg);
      }
    } catch (err: any) {
      console.error("Failed to load dashboard data from MongoDB:", err);
      setDashboardError(err?.message || "Failed to connect to the Eunoia Cloud Database. Check your internet connection and MongoDB credentials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("manjima_auth") === "true") setIsAuthenticated(true);
    fetchDbData();
  }, []);

  useEffect(() => {
    if (mobileOrderOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOrderOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "5555") { setIsAuthenticated(true); localStorage.setItem("manjima_auth", "true"); }
    else alert("Incorrect PIN");
  };
  const handleLogout = () => { setIsAuthenticated(false); localStorage.removeItem("manjima_auth"); };

  const saveOrderChanges = async (updated: any) => {
    try {
      const res = await fetch(`/api/orders/${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (res.ok && data.success !== false) {
        const savedData = data.success ? data.data : data;
        const next = orders.map(o => o.id === savedData.id ? savedData : o);
        setOrders(next); setSelectedOrder(savedData);
      } else {
        const errMsg = data.error || "Failed to save order changes to MongoDB.";
        alert(errMsg);
      }
    } catch (err: any) {
      console.error("Failed to update order in MongoDB:", err);
      alert(`Error saving order: ${err?.message || err}`);
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Image too large (max 2 MB)"); return; }
    const reader = new FileReader();
    reader.onloadend = () => saveOrderChanges({ ...selectedOrder, previewImage: reader.result });
    reader.readAsDataURL(file);
  };

  const saveProduct = async (product: SavedProduct) => {
    try {
      if (editingProduct) {
        // Edit existing product
        const res = await fetch(`/api/products/${product.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        const data = await res.json();
        if (res.ok && data.success !== false) {
          const updated = data.success ? data.data : data;
          const next = savedProducts.map(p => p.id === product.id ? updated : p);
          setSavedProducts(next);
        } else {
          const errMsg = data.error || "Failed to update product in MongoDB.";
          alert(errMsg);
          return;
        }
      } else {
        // Create new product
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        const data = await res.json();
        if (res.ok && data.success !== false) {
          const created = data.success ? data.data : data;
          setSavedProducts([created, ...savedProducts]);
        } else {
          const errMsg = data.error || "Failed to create product in MongoDB.";
          alert(errMsg);
          return;
        }
      }
      setEditingProduct(null);
      setProductView("list");
    } catch (err: any) {
      console.error("Error saving product:", err);
      alert(`Failed to save product to database: ${err?.message || err}`);
    }
  };
  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success !== false) {
        const next = savedProducts.filter(p => p.id !== id);
        setSavedProducts(next);
      } else {
        const errMsg = data.error || "Failed to delete product from MongoDB.";
        alert(errMsg);
      }
    } catch (err: any) {
      console.error("Error deleting product:", err);
      alert(`Failed to delete product from database: ${err?.message || err}`);
    }
  };
  const startEdit = (p: SavedProduct) => { setEditingProduct(p); setProductView("form"); };
  const startAdd  = () => { setEditingProduct(null); setProductView("form"); };
  const cancelForm = () => { setEditingProduct(null); setProductView("list"); };

  const handleSyncData = async () => {
    const localOrders = JSON.parse(localStorage.getItem("era_orders") || "[]");
    const localProducts = JSON.parse(localStorage.getItem("era_products") || "[]");

    if (localOrders.length === 0 && localProducts.length === 0) {
      alert("No local browser data found to sync!");
      return;
    }

    if (!confirm(`Found ${localOrders.length} orders and ${localProducts.length} products locally. Do you want to sync them to the MongoDB Cloud database? This will clear them from your browser storage.`)) {
      return;
    }

    setIsSyncing(true);
    try {
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders: localOrders, products: localProducts }),
      });
      const data = await res.json();
      if (res.ok && data.success !== false) {
        alert(data.message || "Sync completed successfully!");
        localStorage.removeItem("era_orders");
        localStorage.removeItem("era_products");
        await fetchDbData();
      } else {
        const errMsg = data.error || "Sync failed.";
        alert(`Sync failed: ${errMsg}`);
      }
    } catch (err: any) {
      console.error("Sync error:", err);
      alert(`Error occurred during data sync: ${err?.message || err}`);
    } finally {
      setIsSyncing(false);
    }
  };


  const generateWhatsAppLink = (order: any) => {
    if (!order) return "";
    const phone = (order.customerWhatsapp || order.customerPhone || "").replace(/[^0-9]/g, "");
    const link = `https://eunoiaresinart.vercel.app/track/${order.id}`;
    const msgs: Record<string, string> = {
      "Order Received": "We have successfully received your order! We will keep you updated.",
      "Waiting For Flowers": "We are currently waiting to receive your beautiful flowers safely at our studio.",
      "Waiting For Images": "We are currently waiting for you to upload your images so we can begin.",
      "Flowers Received": "Great news! Your precious flowers have safely arrived at our studio.",
      "Design Planning": "Manjima is currently sketching and planning the perfect custom layout for your piece.",
      "Resin Casting": "The first layers of crystal clear resin are now being poured!",
      "Drying Process": "Your piece is currently in the crucial drying stage. Perfect curing takes time for absolute clarity.",
      "Finishing & Polishing": "Your piece is almost ready! We are now sanding and polishing the edges to perfection.",
      "Ready For Dispatch": "Your piece is complete and ready for dispatch! We are packing it safely.",
      "Shipped": "Your order has been shipped!",
      "Delivered": "Your order has been marked as delivered. We hope you love your eternal memory!",
    };
    let msg = `Hello ${order.customerName}, This is an update on your Eunoia Resin Art order (${order.id}).\n\n`;
    msg += msgs[order.status] || `Your order has been updated to: ${order.status}`;
    if (order.adminNotes) msg += `\n\nStudio Message:\n${order.adminNotes}`;
    if (order.courierDetails) msg += `\n\nTracking Details:\n${order.courierDetails}`;
    msg += `\n\nTrack your order live here:\n${link}`;
    return `https://wa.me/91${phone.slice(-10)}?text=${encodeURIComponent(msg)}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-secondary/40 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-light/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="glass-card rounded-[2rem] p-8 md:p-12 max-w-sm w-full text-center shadow-[0_20px_60px_-15px_rgba(201,161,74,0.15)] relative z-10">
          <div className="h-20 w-20 bg-background rounded-full flex items-center justify-center mx-auto mb-8 shadow-soft border border-gold/20">
            <Lock className="h-8 w-8 text-gold" />
          </div>
          <div className="text-[10px] tracking-[0.4em] text-gold uppercase mb-3">Eunoia Resin Art</div>
          <h1 className="font-display text-4xl text-foreground mb-3">Studio Access</h1>
          <p className="text-muted-foreground text-xs tracking-widest uppercase mb-10">Authorized Personnel Only</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" value={pin} onChange={e => setPin(e.target.value)} placeholder="* * * *"
              className="w-full bg-background/60 backdrop-blur-sm border border-border rounded-2xl px-6 py-4 text-center tracking-[1em] text-foreground text-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all shadow-inner"
              autoFocus />
            <button type="submit" className="w-full bg-foreground text-background rounded-2xl py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-gold hover:text-primary-foreground transition-all shadow-lg">
              Unlock Workspace
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalOrders = orders.length;
  const waitingForMaterial = orders.filter(o => o.status === "Waiting For Flowers" || o.status === "Waiting For Images").length;
  const inDrying   = orders.filter(o => o.status === "Drying Process").length;
  const ready      = orders.filter(o => o.status === "Ready For Dispatch").length;
  const delivered  = orders.filter(o => o.status === "Delivered").length;
  const filteredOrders = orders.filter(o =>
    o.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* MOBILE HEADER */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div>
          <div className="font-display text-lg leading-none">Eunoia Studio</div>
          <div className="text-[8px] tracking-[0.3em] text-gold uppercase mt-0.5">Management Console</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSyncData} disabled={isSyncing} className="flex items-center gap-1.5 text-xs text-gold border border-gold/30 bg-gold/5 px-3 py-1.5 rounded-full hover:bg-gold/10 transition active:scale-95">
            <Database className={`h-3.5 w-3.5 ${isSyncing ? "animate-pulse" : ""}`} /> Sync
          </button>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition px-3 py-1.5 rounded-full border border-border">
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* DESKTOP SIDEBAR */}
        <aside className="w-64 border-r border-border bg-secondary/30 hidden lg:flex flex-col flex-shrink-0">
          <div className="p-8 border-b border-border">
            <h2 className="font-display text-2xl">Eunoia Studio</h2>
            <div className="text-[9px] tracking-[0.3em] text-gold uppercase mt-1">Management Console</div>
          </div>
          <nav className="p-4 flex-1 space-y-2">
            <button onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === "orders" ? "bg-foreground text-background" : "hover:bg-secondary text-foreground"}`}>
              <PackageSearch className="h-4 w-4" /> All Commissions
            </button>
            <button onClick={() => { setActiveTab("products"); setProductView("list"); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === "products" ? "bg-foreground text-background" : "hover:bg-secondary text-foreground"}`}>
              <LayoutGrid className="h-4 w-4" /> Products
              {savedProducts.length > 0 && (
                <span className="ml-auto text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full">{savedProducts.length}</span>
              )}
            </button>
          </nav>
          <div className="p-6 border-t border-border flex flex-col gap-4">
            <button onClick={handleSyncData} disabled={isSyncing} className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-gold border border-gold/30 bg-gold/5 px-4 py-2.5 rounded-xl hover:bg-gold/10 transition duration-300">
              <Database className={`h-4 w-4 ${isSyncing ? "animate-pulse" : ""}`} /> Sync Local Data
            </button>
            <button onClick={handleLogout} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition text-left pl-2">
              Secure Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-auto pb-24 lg:pb-0">
          {loading ? (
            <LuxurySkeletonLoader />
          ) : dashboardError ? (
            <PremiumErrorState error={dashboardError} onRetry={fetchDbData} />
          ) : activeTab === "orders" ? (
            <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto space-y-6 md:space-y-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="font-display text-2xl md:text-4xl">Studio Overview</h1>
                  <p className="text-muted-foreground text-sm mt-1">Manage your active resin commissions.</p>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium">{format(new Date(), "EEEE, MMMM do")}</div>
                  <div className="text-xs text-muted-foreground">Calicut Studio</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {[
                  { label: "Total",     value: totalOrders,        cls: "",                  gold: false },
                  { label: "Waiting",   value: waitingForMaterial, cls: "text-orange-600/80", gold: false, Icon: PackageOpen },
                  { label: "Drying",    value: inDrying,           cls: "text-gold",           gold: true,  Icon: Droplets },
                  { label: "Ready",     value: ready,              cls: "text-green-600/80",   gold: false, Icon: PackageCheck },
                  { label: "Delivered", value: delivered,          cls: "",                    gold: false, Icon: CheckCircle2 },
                ].map(s => (
                  <div key={s.label} className={`glass-card p-4 rounded-2xl border ${s.gold ? "border-gold/40 bg-gold/5 shadow-[0_0_15px_rgba(201,161,74,0.1)]" : "border-border"}`}>
                    <div className={`flex items-center gap-1.5 text-[9px] uppercase tracking-wider mb-1.5 ${s.gold ? "text-gold" : "text-muted-foreground"}`}>
                      {s.Icon && <s.Icon className="h-3 w-3" />}{s.label}
                    </div>
                    <div className={`font-display text-2xl md:text-3xl ${s.cls}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">
                <div className="glass-card rounded-2xl border border-border overflow-hidden">
                  <div className="p-4 md:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="font-display text-lg md:text-xl">Active Commissions</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input placeholder="Search orders..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        className="bg-secondary/50 border border-border rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-gold transition-colors w-full sm:w-[200px]" />
                    </div>
                  </div>
                  <div className="divide-y divide-border">
                    {filteredOrders.length === 0 && <div className="p-12 text-center text-muted-foreground text-sm">No orders found.</div>}
                    {filteredOrders.map(order => (
                      <button key={order.id}
                        onClick={() => { setSelectedOrder(order); setMobileOrderOpen(true); }}
                        className={`w-full text-left p-4 md:p-5 hover:bg-secondary/40 transition flex items-center justify-between gap-3 ${selectedOrder?.id === order.id ? "bg-secondary/60 border-l-2 border-gold" : "border-l-2 border-transparent"}`}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-mono text-xs">{order.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider flex-shrink-0 ${order.status === "Drying Process" ? "bg-gold/10 text-gold border border-gold/20" : "bg-secondary text-muted-foreground border border-border"}`}>{order.status}</span>
                          </div>
                          <div className="font-medium text-sm md:text-base truncate">{order.customerName}</div>
                          <div className="text-xs text-muted-foreground mt-0.5 truncate">{order.productName}</div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:block">
                  {selectedOrder ? (
                    <OrderEditor order={selectedOrder} onSave={saveOrderChanges} whatsAppLink={generateWhatsAppLink(selectedOrder)} />
                  ) : (
                    <div className="glass-card rounded-3xl border border-border border-dashed flex flex-col items-center justify-center p-12 text-center text-muted-foreground min-h-[400px]">
                      <Package className="h-12 w-12 mb-4 opacity-20" />
                      <p>Select a commission from the list<br />to view details and update progress.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          ) : productView === "list" ? (
            <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto space-y-6 md:space-y-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] tracking-[0.4em] text-gold uppercase mb-1">Product Catalogue</div>
                  <h1 className="font-display text-2xl md:text-4xl">All Products</h1>
                  <p className="text-muted-foreground mt-1 text-sm">{savedProducts.length} product{savedProducts.length !== 1 ? "s" : ""} saved</p>
                </div>
                <button onClick={startAdd}
                  className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-5 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-medium hover:opacity-90 transition-all shadow-gold">
                  <Plus className="h-4 w-4" /> Add Product
                </button>
              </div>

              {savedProducts.length === 0 ? (
                <div className="glass-card rounded-3xl border border-dashed border-border flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                  <LayoutGrid className="h-12 w-12 mb-4 opacity-20" />
                  <p className="text-lg font-display">No products yet</p>
                  <p className="text-sm mt-2">Click "Add Product" to create your first one.</p>
                </div>
              ) : (
                <div className="grid gap-3 md:gap-4">
                  {savedProducts.map(p => (
                    <div key={p.id} className="glass-card rounded-2xl border border-border p-4 md:p-5">
                      <div className="flex items-start gap-4">
                        <div className="h-11 w-11 rounded-xl bg-secondary/60 border border-border flex items-center justify-center flex-shrink-0 text-lg overflow-hidden">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            p.category === "Teak Frame" ? "🪵" : p.category === "Hoop" ? "⭕" : p.category === "Hexagon" ? "⬡" : p.category === "Clock" ? "🕐" : p.category === "Moon Art" ? "🌙" : "✦"
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="font-display text-base md:text-lg truncate">{p.name}</div>
                            <span className={`flex-shrink-0 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${p.status === "Active" ? "border-green-500/40 text-green-600 bg-green-500/5" : p.status === "Sold Out" ? "border-red-400/40 text-red-500 bg-red-500/5" : "border-border text-muted-foreground"}`}>
                              {p.status}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">{p.category} · {p.subtitle || "No subtitle"}</div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {p.selectedSizes?.slice(0, 3).map(s => (
                              <span key={s} className="text-[9px] px-2 py-0.5 rounded border border-border text-muted-foreground">{s}</span>
                            ))}
                            {(p.selectedSizes?.length || 0) > 3 && <span className="text-[9px] text-muted-foreground">+{p.selectedSizes.length - 3} more</span>}
                            {p.pricingMatrix?.filter(r => r.price).length > 0 && (
                              <span className="text-[9px] px-2 py-0.5 rounded border border-gold/30 text-gold">
                                Rs.{Math.min(...p.pricingMatrix.filter(r => r.price).map(r => parseInt(r.price))).toLocaleString("en-IN")}+
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                        <button onClick={() => startEdit(p)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-border text-xs hover:border-gold hover:text-gold transition">
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button onClick={() => deleteProduct(p.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-border text-xs hover:border-red-400 hover:text-red-500 transition">
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          ) : (
            <ProductForm initialData={editingProduct} onSave={saveProduct} onCancel={cancelForm} />
          )}
        </main>
      </div>

      {/* MOBILE BOTTOM TAB BAR */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border flex">
        <button onClick={() => setActiveTab("orders")}
          className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${activeTab === "orders" ? "text-gold" : "text-muted-foreground"}`}>
          <PackageSearch className="h-5 w-5" />
          <span className="text-[9px] uppercase tracking-widest">Orders</span>
        </button>
        <button onClick={() => { setActiveTab("products"); setProductView("list"); }}
          className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors relative ${activeTab === "products" ? "text-gold" : "text-muted-foreground"}`}>
          <LayoutGrid className="h-5 w-5" />
          <span className="text-[9px] uppercase tracking-widest">Products</span>
          {savedProducts.length > 0 && (
            <span className="absolute top-1.5 right-[calc(50%-18px)] h-4 min-w-4 flex items-center justify-center bg-gold text-primary-foreground text-[8px] rounded-full font-bold px-1">
              {savedProducts.length}
            </span>
          )}
        </button>
      </nav>

      {/* MOBILE ORDER BOTTOM SHEET */}
      {mobileOrderOpen && selectedOrder && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOrderOpen(false)} />
          <div className="relative bg-background rounded-t-3xl border-t border-border max-h-[92vh] flex flex-col">
            <div className="flex-shrink-0 pt-3 pb-4 px-4 border-b border-border">
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl">Manage Order</h3>
                <div className="flex items-center gap-3">
                  <a href={`/track/${selectedOrder.id}`} target="_blank" className="text-[10px] uppercase tracking-widest text-gold hover:underline">Live Link</a>
                  <button onClick={() => setMobileOrderOpen(false)} className="p-2 rounded-full hover:bg-secondary transition">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-y-auto flex-1 p-4 pb-8">
              <OrderEditor order={selectedOrder} onSave={saveOrderChanges} whatsAppLink={generateWhatsAppLink(selectedOrder)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function OrderEditor({ order, onSave, whatsAppLink }: {
  order: any; onSave: (o: any) => Promise<void> | void;
  whatsAppLink: string;
}) {
  const [status, setStatus] = React.useState(order.status);
  const [expectedCompletionDate, setExpectedCompletionDate] = React.useState(order.expectedCompletionDate || "");
  const [courierDetails, setCourierDetails] = React.useState(order.courierDetails || "");
  const [adminNotes, setAdminNotes] = React.useState(order.adminNotes || "");
  const [previewImage, setPreviewImage] = React.useState(order.previewImage || "");
  const [kitStatus, setKitStatus] = React.useState(order.kitStatus || (order.preBookingKit ? "Pending" : ""));
  const [isSavingLocal, setIsSavingLocal] = React.useState(false);

  React.useEffect(() => {
    setStatus(order.status);
    setExpectedCompletionDate(order.expectedCompletionDate || "");
    setCourierDetails(order.courierDetails || "");
    setAdminNotes(order.adminNotes || "");
    setPreviewImage(order.previewImage || "");
    setKitStatus(order.kitStatus || (order.preBookingKit ? "Pending" : ""));
  }, [order]);

  const hasChanges = 
    status !== order.status ||
    expectedCompletionDate !== (order.expectedCompletionDate || "") ||
    courierDetails !== (order.courierDetails || "") ||
    adminNotes !== (order.adminNotes || "") ||
    previewImage !== (order.previewImage || "") ||
    kitStatus !== (order.kitStatus || (order.preBookingKit ? "Pending" : ""));

  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Image too large (max 2 MB)"); return; }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveClick = async () => {
    setIsSavingLocal(true);
    try {
      await onSave({
        ...order,
        status,
        expectedCompletionDate,
        courierDetails,
        adminNotes,
        previewImage,
        kitStatus
      });
    } catch (err: any) {
      console.error("Save error:", err);
    } finally {
      setIsSavingLocal(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-secondary/40 rounded-xl p-4 space-y-2.5 text-sm">
        {[["ID", order.id, "font-mono text-xs break-all"], ["Customer", order.customerName, "font-medium"], ["Phone", order.customerPhone, ""], ["Item", `${order.productName} (${order.depth})`, "text-xs text-right"], ["Amount", `Rs.${order.price}`, "text-gold font-semibold"]].map(([label, val, cls]) => val && (
          <div key={label as string} className="flex justify-between items-start border-b border-border pb-2 gap-2">
            <span className="text-muted-foreground flex-shrink-0">{label}</span>
            <span className={`${cls as string} text-right`}>{val}</span>
          </div>
        ))}
        {order.preBookingKit && (
          <div className="flex justify-between border-b border-border pb-2 items-center gap-2">
            <span className="text-gold font-medium">Starter Kit Required</span>
            <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 font-bold">YES</span>
          </div>
        )}
        {order.customerWhatsapp && (
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-[#25D366] font-medium">WhatsApp</span>
            <span className="text-[#25D366]">{order.customerWhatsapp}</span>
          </div>
        )}
        {order.address && (
          <div className="border-b border-border pb-3">
            <span className="text-muted-foreground block mb-2">Delivery Address:</span>
            <div className="text-xs text-foreground/80 leading-relaxed bg-background p-3 rounded-lg border border-border">
              <strong>{order.address.house}</strong>, {order.address.area}<br />
              {order.address.landmark ? `${order.address.landmark}, ` : ""}{order.address.district}<br />
              {order.address.state} - {order.address.pin}
            </div>
          </div>
        )}
        <div>
          <span className="text-muted-foreground block mb-2">Customer Notes:</span>
          <p className="text-xs bg-background p-3 rounded-lg border border-border whitespace-pre-wrap">{order.notes || "No notes provided."}</p>
        </div>
      </div>

      <div className="space-y-4">
        {order.preBookingKit && (
          <div>
            <label className={lbl + " mb-2 block flex items-center gap-1.5 text-gold font-semibold"}>🌸 Kit Shipment Status</label>
            <select value={kitStatus} onChange={e => setKitStatus(e.target.value)}
              className="w-full bg-[#f5f0e6] border border-gold/30 text-gold font-medium rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold">
              <option value="Pending">Pending</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        )}
        <div>
          <label className={lbl + " mb-2 block"}>Production Stage</label>
          <select value={status} onChange={e => setStatus(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold">
            {ALL_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={lbl + " mb-2 block"}>Expected Completion Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn("w-full flex items-center justify-start text-left font-normal bg-background border border-border rounded-xl px-4 py-3 text-sm hover:border-gold transition-colors", !expectedCompletionDate && "text-muted-foreground")}>
                <CalendarIcon className="mr-3 h-4 w-4 text-gold flex-shrink-0" />
                {expectedCompletionDate || <span>Select a date</span>}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-border shadow-soft" align="start">
              <Calendar mode="single"
                selected={expectedCompletionDate ? new Date(expectedCompletionDate) : undefined}
                onSelect={date => { if (date) setExpectedCompletionDate(date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })); }}
                initialFocus className="rounded-xl bg-background" />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className={lbl + " mb-2 block"}>Courier & Tracking</label>
          <input type="text" value={courierDetails} onChange={e => setCourierDetails(e.target.value)}
            placeholder="e.g. DTDC - Tracking ID 987654"
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold" />
        </div>
        <div>
          <label className={lbl + " mb-2 block"}>Internal Admin Notes</label>
          <textarea value={adminNotes} onChange={e => setAdminNotes(e.target.value)}
            rows={3} placeholder="Private studio notes..."
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold resize-none" />
        </div>
        <div>
          <label className={lbl + " mb-2 block"}>Production Update Photo</label>
          {previewImage ? (
            <div className="relative rounded-xl overflow-hidden border border-border group">
              <img src={previewImage} alt="Preview" className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => setPreviewImage("")} className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition"><X className="h-4 w-4" /></button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative w-full h-20 border-2 border-dashed border-border rounded-xl flex items-center justify-center hover:border-gold transition cursor-pointer bg-secondary/30">
                <input type="file" accept="image/*" onChange={handleLocalImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Upload Preview Photo</span>
              </div>
              <input 
                type="text" 
                value={previewImage} 
                onChange={e => setPreviewImage(e.target.value)} 
                placeholder="Or paste Direct Image URL..." 
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold transition-colors" 
              />
            </div>
          )}
        </div>
      </div>

      {hasChanges && (
        <button onClick={handleSaveClick} disabled={isSavingLocal}
          className="w-full flex items-center justify-center gap-2 bg-gold text-primary-foreground rounded-xl py-3.5 text-xs tracking-widest uppercase font-medium hover:opacity-90 transition active:scale-95 shadow-md shadow-gold/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {isSavingLocal ? "Saving Changes..." : "Save Order Changes"}
        </button>
      )}

      <a href={whatsAppLink} target="_blank"
        className="w-full block text-center bg-[#25D366] text-white rounded-xl py-3.5 text-xs tracking-widest uppercase font-medium hover:opacity-90 transition shadow-lg shadow-[#25D366]/20">
        Message on WhatsApp
      </a>
    </div>
  );
}
function ProductForm({ initialData, onSave, onCancel }: {
  initialData: SavedProduct | null;
  onSave: (p: SavedProduct) => void;
  onCancel: () => void;
}) {
  const isEdit = !!initialData;
  const [name,           setName]           = useState(initialData?.name           || "");
  const [category,       setCategory]       = useState(initialData?.category       || CATEGORIES[0]);
  const [subtitle,       setSubtitle]       = useState(initialData?.subtitle       || "");
  const [description,    setDescription]    = useState(initialData?.description    || "");
  const [image,          setImage]          = useState(initialData?.image          || "");
  const [gallery,        setGallery]        = useState<string[]>(initialData?.gallery || []);
  const [hoverImage,     setHoverImage]     = useState(initialData?.hoverImage     || "");
  const [selectedSizes,  setSelectedSizes]  = useState<string[]>(initialData?.selectedSizes  || ["9x12"]);
  const [selectedDepths, setSelectedDepths] = useState<string[]>(initialData?.selectedDepths || ["10mm","15mm","20mm","30mm"]);
  const [pricingMatrix,  setPricingMatrix]  = useState<PricingRow[]>(initialData?.pricingMatrix || [{ size: "9x12", depth: "15mm", price: "" }]);
  const [badge,          setBadge]          = useState<""|"bestseller"|"limited">(initialData?.badge as any || "bestseller");
  const [isFeatured,     setIsFeatured]     = useState(initialData?.isFeatured ?? false);
  const [isSignatureCollection, setIsSignatureCollection] = useState(initialData?.isSignatureCollection ?? false);
  const [allowShip,      setAllowShip]      = useState(initialData?.allowShipFlowers ?? true);
  const [allowUpload,    setAllowUpload]    = useState(initialData?.allowUploadImages ?? true);
  const [showProd,       setShowProd]       = useState(initialData?.showProductionTime ?? true);
  const [showShip,       setShowShip]       = useState(initialData?.showShipping   ?? true);
  const [showPay,        setShowPay]        = useState(initialData?.showPayment    ?? true);
  const [status,         setStatus]         = useState(initialData?.status         || "Active");
  const [metaTitle,      setMetaTitle]      = useState(initialData?.metaTitle      || "");
  const [metaDesc,       setMetaDesc]       = useState(initialData?.metaDesc       || "");
  const [slug,           setSlug]           = useState(initialData?.slug           || "");
  const [saved,          setSaved]          = useState(false);
  const [showPreview,    setShowPreview]    = useState(false);

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Image too large (max 2 MB)"); return; }
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleHoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Hover image too large (max 2 MB)"); return; }
    const reader = new FileReader();
    reader.onloadend = () => setHoverImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    if (gallery.length + files.length > 6) {
      alert("Maximum 6 gallery images allowed.");
      return;
    }
    files.forEach(file => {
      if (file.size > 2 * 1024 * 1024) {
        alert(`${file.name} is too large (max 2 MB)`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setGallery(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const autoSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const toggleSize  = (s: string) => setSelectedSizes(p  => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const toggleDepth = (d: string) => setSelectedDepths(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d]);
  const addRow    = () => setPricingMatrix(p => [...p, { size: selectedSizes[0] || "", depth: selectedDepths[0] || "", price: "" }]);
  const updateRow = (i: number, f: keyof PricingRow, v: string) => setPricingMatrix(p => p.map((r, j) => j === i ? { ...r, [f]: v } : r));
  const removeRow = (i: number) => setPricingMatrix(p => p.filter((_, j) => j !== i));

  const handleSave = () => {
    if (!name.trim()) { alert("Product name is required"); return; }
    const product: SavedProduct = {
      id: initialData?.id || slug || autoSlug || `p-${Date.now()}`,
      name, category, subtitle, description,
      image,
      gallery,
      hoverImage,
      selectedSizes, selectedDepths, pricingMatrix,
      badge, isFeatured, isSignatureCollection,
      allowShipFlowers: allowShip, allowUploadImages: allowUpload,
      showProductionTime: showProd, showShipping: showShip, showPayment: showPay,
      status, metaTitle: metaTitle || name, metaDesc: metaDesc || description,
      slug: slug || autoSlug, createdAt: initialData?.createdAt || new Date().toISOString(),
    };
    onSave(product);
    setSaved(true);
  };

  const previewPrice = pricingMatrix.find(r => r.price)?.price || "";

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-[1400px] mx-auto pb-32 lg:pb-12">
      <div className="flex items-center justify-between mb-6 md:mb-10 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onCancel} className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-gold transition flex-shrink-0">
            <ArrowLeft className="h-3.5 w-3.5" /><span className="hidden sm:inline">All Products</span>
          </button>
          <div className="w-px h-5 bg-border hidden sm:block flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] tracking-[0.4em] text-gold uppercase mb-0.5">{isEdit ? "Editing Product" : "New Product"}</div>
            <h1 className="font-display text-xl md:text-3xl truncate">{isEdit ? name || "Edit Product" : "Add New Product"}</h1>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <button onClick={onCancel} className="px-4 py-2.5 rounded-full border border-border text-xs tracking-widest uppercase hover:bg-secondary transition">Cancel</button>
          <button onClick={handleSave}
            className={`px-6 py-2.5 rounded-full text-xs tracking-[0.2em] uppercase font-medium transition-all ${saved ? "bg-green-600 text-white" : "bg-gold text-primary-foreground hover:opacity-90 shadow-gold"}`}>
            {saved ? "Saved!" : isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>

      <button onClick={() => setShowPreview(v => !v)}
        className="xl:hidden w-full mb-5 flex items-center justify-between px-5 py-3 glass-card rounded-2xl border border-border text-sm">
        <span className="text-muted-foreground text-xs uppercase tracking-widest">Live Preview</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showPreview ? "rotate-180" : ""}`} />
      </button>

      {showPreview && (
        <div className="xl:hidden mb-5">
          <ProductPreviewCard name={name} category={category} subtitle={subtitle} badge={badge} status={status}
            slug={slug || autoSlug} selectedSizes={selectedSizes} selectedDepths={selectedDepths}
            pricingMatrix={pricingMatrix} previewPrice={previewPrice} showProd={showProd} showShip={showShip} showPay={showPay} image={image} gallery={gallery} hoverImage={hoverImage} />
        </div>
      )}

      <div className="grid xl:grid-cols-[1fr_360px] gap-8 items-start">
        <div className="space-y-5 md:space-y-8">

          <Card title="O" label="Basic Product Details">
            <div className="space-y-4">
              <Field label="Product Name" hint="e.g. 9x12 Teak Frame">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="9x12 Teak Frame" className={inp} />
              </Field>
              <Field label="Product Category">
                <select value={category} onChange={e => setCategory(e.target.value)} className={inp}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Product Subtitle" hint="Short tagline">
                <input value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Soulfully handcrafted floral preservation art." className={inp} />
              </Field>
              <Field label="Product Description">
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Luxurious long description of this piece..." className={inp + " resize-none"} />
              </Field>
            </div>
          </Card>

          <Card title="📷" label="Product Images & Media">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Main & Hover Images */}
              <div className="space-y-4">
                <Field label="Main Thumbnail" hint="Upload file or enter direct URL">
                  {image ? (
                    <div className="relative rounded-xl overflow-hidden border border-border group w-full max-w-[200px] aspect-[4/5] bg-secondary/30 mt-1">
                      <img src={image} alt="Main Thumbnail" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={() => setImage("")} className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition shadow-lg"><X className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 mt-1">
                      <div className="relative w-full h-28 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center hover:border-gold hover:bg-gold/5 transition cursor-pointer bg-secondary/10 group">
                        <input type="file" accept="image/*" onChange={handleProductImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <Upload className="h-5 w-5 text-muted-foreground group-hover:text-gold mb-1.5 transition-colors" />
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-gold transition-colors">Upload Main Thumbnail</span>
                        <span className="text-[8px] text-muted-foreground/60 mt-0.5">PNG, JPG, WebP up to 2MB</span>
                      </div>
                      <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="Or paste Direct Image URL..." className="w-full bg-secondary/20 border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  )}
                </Field>

                <Field label="Hover Image (Optional)" hint="Upload file or enter direct URL">
                  {hoverImage ? (
                    <div className="relative rounded-xl overflow-hidden border border-border group w-full max-w-[200px] aspect-[4/5] bg-secondary/30 mt-1">
                      <img src={hoverImage} alt="Hover Image" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={() => setHoverImage("")} className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition shadow-lg"><X className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 mt-1">
                      <div className="relative w-full h-28 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center hover:border-gold hover:bg-gold/5 transition cursor-pointer bg-secondary/10 group">
                        <input type="file" accept="image/*" onChange={handleHoverImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <Upload className="h-5 w-5 text-muted-foreground group-hover:text-gold mb-1.5 transition-colors" />
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-gold transition-colors">Upload Hover Image</span>
                        <span className="text-[8px] text-muted-foreground/60 mt-0.5">PNG, JPG, WebP up to 2MB</span>
                      </div>
                      <input type="text" value={hoverImage} onChange={e => setHoverImage(e.target.value)} placeholder="Or paste Direct Hover Image URL..." className="w-full bg-secondary/20 border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  )}
                </Field>
              </div>

              {/* Gallery Images */}
              <div>
                <Field label="Gallery Images" hint={`Upload up to 6 gallery photos (${gallery.length}/6)`}>
                  <div className="mt-2 space-y-4">
                    {gallery.length < 6 && (
                      <div className="space-y-2">
                        <div className="relative w-full h-24 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center hover:border-gold hover:bg-gold/5 transition cursor-pointer bg-secondary/10 group">
                          <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                          <Upload className="h-5 w-5 text-muted-foreground group-hover:text-gold mb-1 transition-colors" />
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-gold transition-colors">Upload Gallery Images</span>
                          <span className="text-[8px] text-muted-foreground/60 mt-0.5">Select one or multiple images</span>
                        </div>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            id="gallery-direct-url"
                            placeholder="Or paste Direct Gallery Image URL and click add..." 
                            className="flex-1 bg-secondary/20 border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold transition-colors"
                            onKeyDown={e => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const val = (e.target as HTMLInputElement).value.trim();
                                if (val) {
                                  if (gallery.length >= 6) {
                                    alert("Maximum 6 gallery images allowed.");
                                    return;
                                  }
                                  setGallery(prev => [...prev, val]);
                                  (e.target as HTMLInputElement).value = "";
                                }
                              }
                            }}
                          />
                          <button 
                            type="button" 
                            onClick={() => {
                              const el = document.getElementById("gallery-direct-url") as HTMLInputElement;
                              const val = el?.value.trim();
                              if (val) {
                                if (gallery.length >= 6) {
                                  alert("Maximum 6 gallery images allowed.");
                                  return;
                                }
                                setGallery(prev => [...prev, val]);
                                el.value = "";
                              }
                            }}
                            className="bg-gold text-primary-foreground text-xs uppercase tracking-widest px-4 rounded-xl hover:opacity-90 active:scale-95 transition"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}

                    {gallery.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {gallery.map((img, index) => (
                          <div key={index} className="relative rounded-xl overflow-hidden border border-border group aspect-[4/5] bg-secondary/30 flex flex-col justify-end">
                            <img src={img} alt={`Gallery ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                            
                            {/* Reordering Controls & Delete Overlay */}
                            <div className="absolute inset-x-0 bottom-0 bg-black/75 p-1.5 flex items-center justify-between gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex gap-1">
                                <button
                                  type="button"
                                  disabled={index === 0}
                                  onClick={() => {
                                    const next = [...gallery];
                                    const temp = next[index];
                                    next[index] = next[index - 1];
                                    next[index - 1] = temp;
                                    setGallery(next);
                                  }}
                                  className="p-1 bg-secondary/60 hover:bg-gold text-white disabled:opacity-30 disabled:hover:bg-secondary/60 rounded text-[10px] font-mono leading-none transition-colors"
                                >
                                  ←
                                </button>
                                <button
                                  type="button"
                                  disabled={index === gallery.length - 1}
                                  onClick={() => {
                                    const next = [...gallery];
                                    const temp = next[index];
                                    next[index] = next[index + 1];
                                    next[index + 1] = temp;
                                    setGallery(next);
                                  }}
                                  className="p-1 bg-secondary/60 hover:bg-gold text-white disabled:opacity-30 disabled:hover:bg-secondary/60 rounded text-[10px] font-mono leading-none transition-colors"
                                >
                                  →
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => setGallery(prev => prev.filter((_, i) => i !== index))}
                                className="p-1 bg-red-500/85 hover:bg-red-600 text-white rounded text-[9px] uppercase tracking-wider transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Field>
              </div>
            </div>
          </Card>

          <Card title="*" label="Product Configuration">
            <div className="space-y-6 md:space-y-8">
              <div>
                <div className={lbl + " mb-3"}>Available Frame Sizes</div>
                <div className="flex flex-wrap gap-2">
                  {FRAME_SIZES.map(s => (
                    <button key={s} onClick={() => toggleSize(s)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${selectedSizes.includes(s) ? "border-gold text-gold bg-gold/5 shadow-[0_0_8px_rgba(201,161,74,0.2)]" : "border-border text-muted-foreground hover:border-gold"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className={lbl + " mb-3"}>Available Resin Depths</div>
                <div className="flex flex-wrap gap-2">
                  {DEPTHS.map(d => (
                    <button key={d} onClick={() => toggleDepth(d)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${selectedDepths.includes(d) ? "border-gold text-gold bg-gold/5 shadow-[0_0_8px_rgba(201,161,74,0.2)]" : "border-border text-muted-foreground hover:border-gold"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={lbl}>Dynamic Pricing Matrix</div>
                  <button onClick={addRow} className="text-[10px] tracking-widest uppercase text-gold border border-gold/40 hover:bg-gold/5 px-3 py-1 rounded-full transition">+ Add Row</button>
                </div>
                <div className="rounded-2xl border border-border overflow-auto">
                  <div className="min-w-[300px]">
                    <div className="grid grid-cols-[1fr_1fr_1fr_36px] bg-secondary/50">
                      {["Size", "Depth", "Price (Rs)", ""].map(h => (
                        <div key={h} className="px-3 py-2.5 text-[10px] uppercase tracking-widest text-muted-foreground font-medium border-b border-border">{h}</div>
                      ))}
                    </div>
                    {pricingMatrix.length === 0 && (
                      <div className="py-8 text-center text-sm text-muted-foreground">No rows yet - click + Add Row above.</div>
                    )}
                    {pricingMatrix.map((row, i) => (
                      <div key={i} className="grid grid-cols-[1fr_1fr_1fr_36px] divide-x divide-border border-b border-border last:border-b-0">
                        <select value={row.size} onChange={e => updateRow(i, "size", e.target.value)} className="px-3 py-3 text-sm bg-background focus:outline-none">
                          {(selectedSizes.length ? selectedSizes : FRAME_SIZES).map(s => <option key={s}>{s}</option>)}
                        </select>
                        <select value={row.depth} onChange={e => updateRow(i, "depth", e.target.value)} className="px-3 py-3 text-sm bg-background focus:outline-none">
                          {(selectedDepths.length ? selectedDepths : DEPTHS).map(d => <option key={d}>{d}</option>)}
                        </select>
                        <input type="number" value={row.price} onChange={e => updateRow(i, "price", e.target.value)} placeholder="4350" className="px-3 py-3 text-sm bg-background focus:outline-none" />
                        <div className="flex items-center justify-center bg-background">
                          <button onClick={() => removeRow(i)} className="text-muted-foreground hover:text-red-500 transition p-1"><X className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="#" label="Display Settings">
            <div className="space-y-5">
              <div>
                <div className={lbl + " mb-3"}>Product Badge</div>
                <div className="flex flex-wrap gap-2">
                  {([["", "No Badge"], ["bestseller", "Bestseller"], ["limited", "Only 2 Left"]] as [string, string][]).map(([val, text]) => (
                    <button key={val} onClick={() => setBadge(val as any)}
                      className={`px-4 py-2 rounded-full text-xs border transition ${badge === val ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground hover:border-gold"}`}>
                      {text}
                    </button>
                  ))}
                </div>
              </div>
              <Toggle label="Featured on Homepage" value={isFeatured} onChange={setIsFeatured} />
              <Toggle label="Signature Collection" value={isSignatureCollection} onChange={setIsSignatureCollection} />
            </div>
          </Card>

          <Card title="+" label="Customization Settings">
            <div className="space-y-3">
              <Toggle label="Allow: Ship Flowers" value={allowShip} onChange={setAllowShip} />
              <Toggle label="Allow: Upload Images" value={allowUpload} onChange={setAllowUpload} />
            </div>
          </Card>

          <Card title="!" label="Important Notice Settings">
            <div className="space-y-3">
              <Toggle label="Production Time (30-35 working days)" value={showProd} onChange={setShowProd} />
              <Toggle label="Shipping Included in all prices" value={showShip} onChange={setShowShip} />
              <Toggle label="Payment after flowers received" value={showPay} onChange={setShowPay} />
            </div>
          </Card>

          <Card title="." label="Product Status">
            <div className="flex flex-wrap gap-2">
              {PROD_STATUS.map(s => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`px-4 py-2 rounded-full text-xs border transition ${status === s ? "border-gold text-gold bg-gold/5 shadow-[0_0_8px_rgba(201,161,74,0.2)]" : "border-border text-muted-foreground hover:border-gold"}`}>
                  {s}
                </button>
              ))}
            </div>
          </Card>

          <Card title="S" label="SEO Settings">
            <div className="space-y-4">
              <Field label="Meta Title">
                <input value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder={name || "Product meta title"} className={inp} />
              </Field>
              <Field label="Meta Description">
                <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} rows={2} placeholder={description || "Short description for search engines..."} className={inp + " resize-none"} />
              </Field>
              <Field label="URL Slug">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm focus-within:border-gold transition">
                  <span className="text-muted-foreground">/product/</span>
                  <input value={slug} onChange={e => setSlug(e.target.value)} placeholder={autoSlug || "9x12-teak-frame"} className="flex-1 bg-transparent focus:outline-none" />
                </div>
              </Field>
            </div>
          </Card>
        </div>

        <div className="hidden xl:block xl:sticky xl:top-8 space-y-6">
          <div className="text-[10px] tracking-[0.4em] text-gold uppercase text-center flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-gold/40" /> Live Preview <span className="w-8 h-px bg-gold/40" />
          </div>
          <ProductPreviewCard name={name} category={category} subtitle={subtitle} badge={badge} status={status}
            slug={slug || autoSlug} selectedSizes={selectedSizes} selectedDepths={selectedDepths}
            pricingMatrix={pricingMatrix} previewPrice={previewPrice} showProd={showProd} showShip={showShip} showPay={showPay} image={image} gallery={gallery} hoverImage={hoverImage} />
        </div>
      </div>

      <div className="xl:hidden fixed bottom-16 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-sm border-t border-border flex gap-3">
        <button onClick={onCancel} className="flex-1 py-3 rounded-full border border-border text-xs tracking-widest uppercase hover:bg-secondary transition">
          Cancel
        </button>
        <button onClick={handleSave}
          className={`flex-1 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-medium transition-all ${saved ? "bg-green-600 text-white" : "bg-gold text-primary-foreground hover:opacity-90 shadow-gold"}`}>
          {saved ? "Saved!" : isEdit ? "Update Product" : "Save Product"}
        </button>
      </div>
    </div>
  );
}
function ProductPreviewCard({ name, category, subtitle, badge, status, slug, selectedSizes, selectedDepths, pricingMatrix, previewPrice, showProd, showShip, showPay, image, gallery = [], hoverImage }: {
  name: string; category: string; subtitle: string; badge: string; status: string; slug: string;
  selectedSizes: string[]; selectedDepths: string[]; pricingMatrix: PricingRow[]; previewPrice: string;
  showProd: boolean; showShip: boolean; showPay: boolean; image?: string; gallery?: string[]; hoverImage?: string;
}) {
  const [activeImage, setActiveImage] = useState<string | undefined>(image);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setActiveImage(image);
  }, [image]);

  return (
    <div className="space-y-4">
      <div className="glass-card rounded-3xl border border-border overflow-hidden shadow-soft">
        <div 
          className="aspect-[4/5] bg-secondary/50 flex flex-col items-center justify-center gap-2 text-muted-foreground/30 relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {activeImage ? (
            <img 
              src={activeImage} 
              alt={name} 
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                isHovered && hoverImage ? "opacity-0" : "opacity-100"
              )} 
            />
          ) : (
            <div className={cn("absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-300", isHovered && hoverImage ? "opacity-0" : "opacity-100")}>
              <span className="text-5xl">
                {category === "Teak Frame" ? "wood" : category === "Hoop" ? "circle" : category === "Hexagon" ? "hex" : category === "Clock" ? "clock" : category === "Moon Art" ? "moon" : "star"}
              </span>
              <span className="text-[10px] uppercase tracking-widest">{category}</span>
            </div>
          )}

          {hoverImage && (
            <img 
              src={hoverImage} 
              alt={`${name} Hover`} 
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none",
                isHovered ? "opacity-100" : "opacity-0"
              )} 
            />
          )}

          {badge && (
            <span className="absolute top-3 left-3 bg-foreground text-background text-[9px] tracking-[0.25em] uppercase px-2 py-1 rounded z-10">
              {badge === "bestseller" ? "Bestseller" : "Only 2 Left"}
            </span>
          )}
        </div>

        {/* Gallery thumbnails */}
        {gallery && gallery.length > 0 && (
          <div className="flex gap-1.5 p-3 border-b border-border bg-secondary/10 overflow-x-auto">
            {image && (
              <button 
                type="button"
                onClick={() => setActiveImage(image)} 
                className={cn(
                  "w-10 h-12 rounded border overflow-hidden flex-shrink-0 transition-all",
                  activeImage === image ? "border-gold ring-1 ring-gold" : "border-border opacity-70 hover:opacity-100"
                )}
              >
                <img src={image} alt="Main thumb" className="w-full h-full object-cover" />
              </button>
            )}
            {gallery.map((img, i) => (
              <button 
                type="button"
                key={i}
                onClick={() => setActiveImage(img)} 
                className={cn(
                  "w-10 h-12 rounded border overflow-hidden flex-shrink-0 transition-all",
                  activeImage === img ? "border-gold ring-1 ring-gold" : "border-border opacity-70 hover:opacity-100"
                )}
              >
                <img src={img} alt={`Gallery thumb ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="p-5">
          <div className="text-[9px] tracking-[0.35em] uppercase text-gold mb-1">{category}</div>
          <div className="font-display text-xl">{name || "Product Name"}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{subtitle || "Subtitle appears here"}</div>
          <div className="text-gold text-sm font-medium mt-2">
            {previewPrice ? `Rs.${parseInt(previewPrice).toLocaleString("en-IN")}` : "Rs. -"}
          </div>
        </div>
        {selectedSizes.length > 0 && (
          <div className="px-5 pb-3">
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-2">Frame Size</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedSizes.map((s, i) => <span key={s} className={`px-2.5 py-1 rounded text-[10px] border ${i === 0 ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground"}`}>{s}</span>)}
            </div>
          </div>
        )}
        {selectedDepths.length > 0 && (
          <div className="px-5 pb-5">
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-2">Resin Depth</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedDepths.map((d, i) => <span key={d} className={`px-2.5 py-1 rounded text-[10px] border ${i === 1 ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground"}`}>{d}</span>)}
            </div>
          </div>
        )}
        {(showProd || showShip || showPay) && (
          <div className="border-t border-border px-5 py-4 space-y-1.5">
            {showProd && <div className="text-[10px] text-muted-foreground">30-35 working days</div>}
            {showShip && <div className="text-[10px] text-muted-foreground">Shipping included in all prices</div>}
            {showPay  && <div className="text-[10px] text-muted-foreground">Pay after flowers safely received</div>}
          </div>
        )}
        <div className="border-t border-border px-5 py-3 flex items-center justify-between">
          <span className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${status === "Active" ? "border-green-500/40 text-green-600 bg-green-500/5" : status === "Sold Out" ? "border-red-400/40 text-red-500 bg-red-500/5" : "border-border text-muted-foreground"}`}>
            {status}
          </span>
          <span className="text-[9px] text-muted-foreground">/product/{slug || "slug"}</span>
        </div>
      </div>
      {pricingMatrix.some(r => r.price) && (
        <div className="glass-card rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 border-b border-border"><div className={lbl}>Pricing Preview</div></div>
          <div className="divide-y divide-border">
            {pricingMatrix.filter(r => r.price).map((row, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 text-sm">
                <span className="text-muted-foreground">{row.size} - {row.depth}</span>
                <span className="text-gold font-medium">Rs.{parseInt(row.price).toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LuxurySkeletonLoader() {
  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto space-y-6 md:space-y-10 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-secondary/50 rounded-xl" />
          <div className="h-4 w-64 bg-secondary/30 rounded-lg" />
        </div>
        <div className="text-right hidden sm:block space-y-2">
          <div className="h-4 w-32 bg-secondary/40 ml-auto rounded-lg" />
          <div className="h-3.5 w-24 bg-secondary/30 ml-auto rounded-lg" />
        </div>
      </div>

      {/* Grid Stats Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="glass-card p-4 rounded-2xl border border-border/60 bg-secondary/10 space-y-3">
            <div className="h-3 w-16 bg-secondary/40 rounded" />
            <div className="h-8 w-12 bg-secondary/60 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">
        <div className="glass-card rounded-2xl border border-border/60 overflow-hidden bg-secondary/5">
          <div className="p-4 md:p-6 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="h-6 w-36 bg-secondary/50 rounded-lg" />
            <div className="h-9 w-48 bg-secondary/30 rounded-full" />
          </div>
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                <div className="space-y-2 flex-1">
                  <div className="flex gap-2 items-center">
                    <div className="h-3.5 w-20 bg-secondary/50 rounded" />
                    <div className="h-3.5 w-16 bg-secondary/30 rounded-full" />
                  </div>
                  <div className="h-5 w-40 bg-secondary/60 rounded-md" />
                  <div className="h-3.5 w-32 bg-secondary/40 rounded" />
                </div>
                <div className="h-4 w-4 bg-secondary/40 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl border border-border/60 p-6 space-y-6 bg-secondary/5">
          <div className="space-y-3">
            <div className="h-4 w-24 bg-secondary/40 rounded" />
            <div className="h-6 w-full bg-secondary/50 rounded-lg" />
            <div className="h-4 w-3/4 bg-secondary/30 rounded-lg" />
          </div>
          <div className="space-y-4 pt-4 border-t border-border/40">
            <div className="h-10 w-full bg-secondary/40 rounded-xl" />
            <div className="h-10 w-full bg-secondary/40 rounded-xl" />
            <div className="h-12 w-full bg-secondary/50 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PremiumErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-2xl mx-auto min-h-[70vh] flex items-center justify-center">
      <div className="glass-card rounded-[2.5rem] border border-red-500/20 bg-red-950/5 p-8 md:p-12 text-center space-y-6 shadow-[0_20px_50px_-12px_rgba(239,68,68,0.1)] max-w-md w-full relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
        <div className="h-16 w-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto border border-red-500/20 text-red-500 animate-pulse">
          <Database className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <div className="text-[10px] tracking-[0.4em] text-red-500 uppercase font-semibold">Database Connection Failure</div>
          <h2 className="font-display text-2xl text-foreground">Could not connect to Eunoia Cloud</h2>
          <p className="text-muted-foreground text-xs leading-relaxed max-w-sm mx-auto">
            {error || "An unexpected error occurred while communicating with the MongoDB Cloud Database. Please make sure MONGODB_URI is configured correctly in Vercel."}
          </p>
        </div>
        <div className="pt-4 space-y-3">
          <button onClick={onRetry} className="w-full flex items-center justify-center gap-2 bg-foreground text-background hover:bg-gold hover:text-primary-foreground font-medium rounded-2xl py-3.5 text-xs tracking-[0.2em] uppercase transition-all shadow-lg active:scale-98">
            <RefreshCw className="h-4 w-4" /> Reconnect to Cloud
          </button>
          <a href="/api/health" target="_blank" className="block text-xs text-muted-foreground hover:text-gold transition">
            Check API Health Endpoint
          </a>
        </div>
      </div>
    </div>
  );
}