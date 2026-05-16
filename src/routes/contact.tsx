import { createFileRoute } from "@tanstack/react-router";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { MapPin, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Let's Start Your Commission | Eunoia Resin Art" },
      { name: "description", content: "Reach Manjima for custom commissions, gallery enquiries and wedding preservation in Calicut, Kerala." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <ScrollReveal>
        <div className="text-center mb-14">
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4">Get In Touch</div>
          <h1 className="font-display text-5xl md:text-6xl">Let's Start Your Commission.</h1>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">A boutique commission begins with a conversation. Tell us what you'd like to preserve.</p>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-10">
        <ScrollReveal>
          <div className="space-y-6 glass-card rounded-2xl p-8">
            <div>
              <MapPin className="h-5 w-5 text-gold" />
              <div className="mt-3 text-[10px] tracking-[0.35em] uppercase text-muted-foreground">Visit The Studio</div>
              <div className="mt-1 text-sm">Jayanthi Nivas (H), Mukkam (PO),<br/>Calicut – 673602, Kerala</div>
            </div>
            <div className="gold-divider" />
            <div>
              <Phone className="h-5 w-5 text-gold" />
              <div className="mt-3 text-[10px] tracking-[0.35em] uppercase text-muted-foreground">Direct Line</div>
              <a href="tel:+917591947287" className="mt-1 block text-sm hover:text-gold">+91 7591 947 287</a>
            </div>
            <div className="gold-divider" />
            <div>
              <Mail className="h-5 w-5 text-gold" />
              <div className="mt-3 text-[10px] tracking-[0.35em] uppercase text-muted-foreground">Email Enquiries</div>
              <a href="mailto:hello@eunoiaresin.art" className="mt-1 block text-sm hover:text-gold">hello@eunoiaresin.art</a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <form className="glass-card rounded-2xl p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Full Name</label>
                <input className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none" placeholder="Aditi Sharma" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Email</label>
                <input type="email" className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none" placeholder="hello@example.com" />
              </div>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Enquiry Type</label>
              <select className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none">
                <option>Custom Home Decor</option>
                <option>Wedding Bouquet Preservation</option>
                <option>Baby Keepsake</option>
                <option>Memorial Tribute</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Your Message</label>
              <textarea rows={6} className="mt-2 w-full bg-transparent border-b border-foreground/30 py-2 text-sm focus:border-gold outline-none resize-none" placeholder="Tell us about your dream piece…" />
            </div>
            <button className="w-full bg-gold text-primary-foreground rounded-full py-3.5 text-xs tracking-[0.25em] uppercase hover:opacity-90 transition">Send Message</button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
