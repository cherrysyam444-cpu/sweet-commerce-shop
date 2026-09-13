import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CHERRY SHOP — Curated, Fairly Priced" },
      { name: "description", content: "CHERRY SHOP is a small Brooklyn team stocking fewer, better products across tech, wardrobe, beauty and home." },
      { property: "og:title", content: "About CHERRY SHOP — Curated, Fairly Priced" },
      { property: "og:description", content: "Why we stock fewer products and how we price them." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Fewer products, chosen properly</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          CHERRY SHOP started in 2021 as a two-person operation in Brooklyn. We were tired of
          scrolling through thousands of near-identical listings, so we built the opposite: a short
          list of products we've used ourselves, with honest descriptions and no invented urgency.
        </p>
        <p>
          Every item is tested for at least four weeks before it goes live. If it doesn't hold up, it
          doesn't get listed — which is why some categories only have three or four products.
        </p>
        <p>
          We buy directly from makers wherever possible and publish the full price up front: no
          surprise fees at checkout, free shipping over $150, and 30 days to change your mind.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          ["2021", "Founded in Brooklyn"],
          ["40k+", "Orders shipped"],
          ["4.7 / 5", "Average product rating"],
        ].map(([k, v]) => (
          <div key={v} className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
            <p className="font-display text-2xl font-bold">{k}</p>
            <p className="mt-1 text-xs text-muted-foreground">{v}</p>
          </div>
        ))}
      </div>
      <Button asChild className="mt-10 rounded-full bg-cherry px-8 text-cherry-foreground hover:bg-cherry/90">
        <Link to="/shop">See what we stock</Link>
      </Button>
    </div>
  );
}
