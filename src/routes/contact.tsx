import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CHERRY SHOP — We Reply Within a Day" },
      { name: "description", content: "Questions about an order, a return or a product? Message the CHERRY SHOP support team and we'll reply within one working day." },
      { property: "og:title", content: "Contact CHERRY SHOP" },
      { property: "og:description", content: "Support by message, email or phone, 24/7." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Contact us</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Support is available around the clock. Most messages get a reply within a few hours.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <form
          className="space-y-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message sent", { description: "We'll reply to you shortly." });
            setForm({ name: "", email: "", message: "" });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="c-name">Name</Label>
              <Input id="c-name" required className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="c-email">Email</Label>
              <Input id="c-email" type="email" required className="mt-1.5" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div>
            <Label htmlFor="c-msg">How can we help?</Label>
            <Textarea id="c-msg" required rows={6} className="mt-1.5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <Button type="submit" className="rounded-full bg-cherry px-8 text-cherry-foreground hover:bg-cherry/90">
            Send message
          </Button>
        </form>

        <aside className="space-y-4">
          {[
            { icon: Mail, label: "hello@cherryshop.com", sub: "Email us any time" },
            { icon: Phone, label: "+1 (555) 010-2030", sub: "Mon–Sun, 24 hours" },
            { icon: MapPin, label: "112 Wythe Ave, Brooklyn NY", sub: "Warehouse pickup by appointment" },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
              <c.icon className="h-5 w-5 text-cherry" />
              <p className="mt-3 text-sm font-semibold">{c.label}</p>
              <p className="text-xs text-muted-foreground">{c.sub}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
