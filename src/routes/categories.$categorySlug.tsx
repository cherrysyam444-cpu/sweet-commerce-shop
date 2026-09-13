import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/product-card";
import { byCategory, categories } from "@/lib/catalog";

export const Route = createFileRoute("/categories/$categorySlug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.categorySlug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — CHERRY SHOP" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    const title = `${category.name} — CHERRY SHOP`;
    return {
      meta: [
        { title },
        { name: "description", content: category.description },
        { property: "og:title", content: title },
        { property: "og:description", content: category.description },
        { property: "og:image", content: category.image },
        { name: "twitter:image", content: category.image },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const [sort, setSort] = useState("popularity");
  const items = [...byCategory(category.slug)].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "newest") return b.createdAt.localeCompare(a.createdAt);
    return b.popularity - a.popularity;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl">
        <img src={category.image} alt={category.name} className="h-56 w-full object-cover sm:h-72" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 text-primary-foreground sm:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
            Category
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{category.name}</h1>
          <p className="mt-2 max-w-md text-sm text-primary-foreground/85">{category.description}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <p className="min-w-0 text-sm text-muted-foreground">{items.length} products</p>
        <div className="flex shrink-0 gap-2">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="h-10 w-[180px] rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild variant="outline" className="h-10 rounded-full">
            <Link to="/shop" search={{ category: category.slug }}>
              All filters
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
