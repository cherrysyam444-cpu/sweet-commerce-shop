import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { deals } from "@/lib/catalog";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Deals & Offers — Up to 50% Off | CHERRY SHOP" },
      { name: "description", content: "Live CHERRY SHOP deals with countdown timers: up to 50% off electronics, fashion, shoes, watches, beauty and home." },
      { property: "og:title", content: "Deals & Offers — Up to 50% Off | CHERRY SHOP" },
      { property: "og:description", content: "Limited-time reductions across every category. Ends soon." },
    ],
  }),
  component: DealsPage,
});

function useCountdown(hours: number) {
  const [left, setLeft] = useState(hours * 3600);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    h: pad(Math.floor(left / 3600)),
    m: pad(Math.floor((left % 3600) / 60)),
    s: pad(left % 60),
  };
}

function DealsPage() {
  const flash = useCountdown(11);
  const weekend = useCountdown(52);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="rounded-3xl bg-ink px-6 py-12 text-primary-foreground sm:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cherry-foreground/70">
          Limited time
        </p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">UP TO 50% OFF</h1>
        <p className="mt-3 max-w-md text-sm text-primary-foreground/80">
          Two events running now. Prices return to full as soon as the clock hits zero.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Flash deals end in", t: flash },
            { label: "Weekend event ends in", t: weekend },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl bg-card/10 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.14em] text-primary-foreground/70">{c.label}</p>
              <p className="mt-2 font-display text-3xl font-bold tabular-nums">
                {c.t.h}:{c.t.m}:{c.t.s}
              </p>
            </div>
          ))}
        </div>
        <Button asChild className="mt-8 rounded-full bg-cherry px-7 text-cherry-foreground hover:bg-cherry/90">
          <Link to="/shop">Browse everything</Link>
        </Button>
      </div>

      <h2 className="mt-14 text-2xl font-bold sm:text-3xl">Biggest reductions</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {deals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
