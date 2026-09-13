import { createFileRoute, Link } from "@tanstack/react-router";
import { byCategory, categories } from "@/lib/catalog";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Shop by Category — CHERRY SHOP" },
      { name: "description", content: "Eight curated CHERRY SHOP departments: electronics, fashion, shoes, watches, beauty, home & kitchen, accessories and fitness." },
      { property: "og:title", content: "Shop by Category — CHERRY SHOP" },
      { property: "og:description", content: "Find your department and start browsing." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Shop by category</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Every department is edited by hand — we stock fewer products so each one is worth buying.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/categories/$categorySlug"
            params={{ categorySlug: c.slug }}
            className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <img
              src={c.image}
              alt={c.name}
              loading="lazy"
              className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <h2 className="truncate font-display text-lg font-semibold">{c.name}</h2>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {byCategory(c.slug).length} items
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
