import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product-card";
import { StarRating } from "@/components/star-rating";
import { categories, testimonials, trending } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CHERRY SHOP — Shop Smart. Live Better." },
      {
        name: "description",
        content:
          "Discover quality products at prices you'll love: electronics, fashion, shoes, watches, beauty, home and fitness. Up to 50% off this week.",
      },
      { property: "og:title", content: "CHERRY SHOP — Shop Smart. Live Better." },
      {
        property: "og:description",
        content: "Curated products across tech, wardrobe and home. Free shipping over $150.",
      },
    ],
  }),
  component: Home,
});

const perks = [
  { icon: ShieldCheck, title: "Secure Payments", text: "PCI-compliant checkout with 3-D Secure on every card." },
  { icon: Truck, title: "Fast Delivery", text: "Dispatched same day, free over $150, tracked end to end." },
  { icon: RotateCcw, title: "Easy Returns", text: "30 days to change your mind, prepaid return labels." },
  { icon: Headphones, title: "24/7 Support", text: "Real humans on chat and phone, any time zone." },
];

function Home() {
  const { subscribeNewsletter } = useStore();
  const [email, setEmail] = useState("");

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-br from-cherry-soft via-background to-secondary/60">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-cherry/30 bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cherry">
              New season · 2026 drop
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-balance-tight sm:text-5xl lg:text-6xl">
              SHOP SMART.
              <br />
              LIVE BETTER.
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
              Discover quality products at prices you'll love.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-cherry px-7 text-cherry-foreground hover:bg-cherry/90">
                <Link to="/shop">
                  Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-ink/20 px-7">
                <Link to="/deals">Explore Deals</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
              {[
                ["28+", "Curated products"],
                ["4.7★", "Average rating"],
                ["48h", "Typical delivery"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="text-2xl font-bold">{k}</dt>
                  <dd className="text-xs text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="fade-up relative grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
              alt="Aurora over-ear headphones on a warm background"
              className="col-span-2 h-64 w-full rounded-3xl object-cover shadow-lift sm:h-80"
            />
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
              alt="Red trail running shoe"
              className="h-40 w-full rounded-2xl object-cover shadow-card sm:h-48"
            />
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
              alt="Heritage automatic wristwatch"
              className="h-40 w-full rounded-2xl object-cover shadow-card sm:h-48"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold sm:text-3xl">Shop by category</h2>
            <p className="mt-1 text-sm text-muted-foreground">Eight edits, each hand-picked.</p>
          </div>
          <Link to="/categories" className="shrink-0 text-sm font-semibold text-cherry hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/categories/$categorySlug"
              params={{ categorySlug: c.slug }}
              className="group relative overflow-hidden rounded-2xl border border-border/70 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-48"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="font-display text-lg font-semibold text-primary-foreground">{c.name}</p>
                <p className="text-xs text-primary-foreground/80 opacity-0 transition-opacity group-hover:opacity-100">
                  Shop now →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold sm:text-3xl">Trending this week</h2>
            <p className="mt-1 text-sm text-muted-foreground">What everyone is adding to their bag.</p>
          </div>
          <Link to="/shop" className="shrink-0 text-sm font-semibold text-cherry hover:underline">
            Browse all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promo */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-primary-foreground sm:px-12">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="relative max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cherry-foreground/80">
              Mid-season event
            </p>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">UP TO 50% OFF</h2>
            <p className="mt-3 text-sm text-primary-foreground/80">
              Hundreds of pieces reduced across every category. Ends Sunday at midnight.
            </p>
            <Button asChild size="lg" className="mt-7 rounded-full bg-cherry px-7 text-cherry-foreground hover:bg-cherry/90">
              <Link to="/deals">Shop Deals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Why choose us</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border/70 bg-card p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-cherry-soft text-cherry">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Loved by 40,000 shoppers</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border/70 bg-card p-6 shadow-card">
                <StarRating rating={t.rating} size={15} />
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-5 flex min-w-0 items-center gap-3">
                  <img src={t.avatar} alt={t.name} loading="lazy" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{t.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-cherry/20 bg-cherry-soft px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Get 10% off your first order</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Join the CHERRY list for new arrivals, restocks and subscriber-only pricing.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              subscribeNewsletter(email);
              setEmail("");
            }}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="h-11 rounded-full bg-card"
            />
            <Button type="submit" className="h-11 shrink-0 rounded-full bg-cherry px-6 text-cherry-foreground hover:bg-cherry/90">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
