import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Filter, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProductCard } from "@/components/product-card";
import { StarRating } from "@/components/star-rating";
import {
  brands,
  categories,
  discountPercent,
  formatPrice,
  products,
  searchProducts,
  type Product,
} from "@/lib/catalog";

type Search = { q?: string | undefined; category?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search["q"] === "string" && search["q"] ? (search["q"] as string) : undefined,
    category:
      typeof search["category"] === "string" && search["category"]
        ? (search["category"] as string)
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Products — CHERRY SHOP" },
      {
        name: "description",
        content:
          "Browse the full CHERRY SHOP catalogue. Filter by category, price, rating, brand and discount, then sort by price, rating or popularity.",
      },
      { property: "og:title", content: "Shop All Products — CHERRY SHOP" },
      {
        property: "og:description",
        content: "Filter and sort 28+ curated products across eight categories.",
      },
    ],
  }),
  component: ShopPage,
});

const sorts = [
  { value: "popularity", label: "Popularity" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
] as const;

const PAGE = 8;

function ShopPage() {
  const { q, category } = Route.useSearch();
  const [query, setQuery] = useState(q ?? "");
  const [selectedCats, setSelectedCats] = useState<string[]>(category ? [category] : []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 1200]);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [sort, setSort] = useState<string>("popularity");
  const [visible, setVisible] = useState(PAGE);

  const toggle = (list: string[], value: string, set: (v: string[]) => void) => {
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
    setVisible(PAGE);
  };

  const results = useMemo(() => {
    let list: Product[] = searchProducts(products, query);
    if (selectedCats.length) list = list.filter((p) => selectedCats.includes(p.category));
    if (selectedBrands.length) list = list.filter((p) => selectedBrands.includes(p.brand));
    list = list.filter((p) => p.price >= price[0] && p.price <= price[1]);
    if (minRating) list = list.filter((p) => p.rating >= minRating);
    if (minDiscount) list = list.filter((p) => discountPercent(p) >= minDiscount);
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "newest") sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === "popularity") sorted.sort((a, b) => b.popularity - a.popularity);
    return sorted;
  }, [query, selectedCats, selectedBrands, price, minRating, minDiscount, sort]);

  const reset = () => {
    setQuery("");
    setSelectedCats([]);
    setSelectedBrands([]);
    setPrice([0, 1200]);
    setMinRating(0);
    setMinDiscount(0);
    setVisible(PAGE);
  };

  const filters = (
    <div className="space-y-7">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">Category</h3>
        <div className="mt-3 space-y-2.5">
          {categories.map((c) => (
            <div key={c.slug} className="flex items-center gap-2.5">
              <Checkbox
                id={`cat-${c.slug}`}
                checked={selectedCats.includes(c.slug)}
                onCheckedChange={() => toggle(selectedCats, c.slug, setSelectedCats)}
              />
              <Label htmlFor={`cat-${c.slug}`} className="text-sm font-normal">
                {c.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">Price</h3>
        <Slider
          className="mt-5"
          value={price}
          onValueChange={(v) => {
            setPrice([v[0] ?? 0, v[1] ?? 1200]);
            setVisible(PAGE);
          }}
          min={0}
          max={1200}
          step={10}
        />
        <p className="mt-3 text-sm text-muted-foreground">
          {formatPrice(price[0])} — {formatPrice(price[1])}
        </p>
      </div>
      <Separator />
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">Rating</h3>
        <div className="mt-3 space-y-2">
          {[4.5, 4, 3.5, 0].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setMinRating(r);
                setVisible(PAGE);
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                minRating === r ? "bg-cherry-soft text-cherry" : "hover:bg-secondary"
              }`}
            >
              {r === 0 ? <span>Any rating</span> : (
                <>
                  <StarRating rating={r} /> <span>{r}+</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">Brand</h3>
        <div className="mt-3 space-y-2.5">
          {brands.map((b) => (
            <div key={b} className="flex items-center gap-2.5">
              <Checkbox
                id={`brand-${b}`}
                checked={selectedBrands.includes(b)}
                onCheckedChange={() => toggle(selectedBrands, b, setSelectedBrands)}
              />
              <Label htmlFor={`brand-${b}`} className="text-sm font-normal">
                {b}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">Discount</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {[0, 20, 30, 40].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => {
                setMinDiscount(d);
                setVisible(PAGE);
              }}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                minDiscount === d
                  ? "border-cherry bg-cherry text-cherry-foreground"
                  : "border-border hover:border-cherry"
              }`}
            >
              {d === 0 ? "All" : `${d}%+`}
            </button>
          ))}
        </div>
      </div>
      <Button variant="outline" className="w-full rounded-full" onClick={reset}>
        Clear all filters
      </Button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Shop all products</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {results.length} product{results.length === 1 ? "" : "s"} available
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden lg:block">{filters}</aside>

        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE);
              }}
              placeholder="Search by name, brand, category or keyword"
              aria-label="Search products"
              className="h-11 rounded-full"
            />
            <div className="flex shrink-0 gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-11 rounded-full lg:hidden">
                    <Filter className="mr-1 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">{filters}</div>
                </SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-11 w-[190px] rounded-full">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  {sorts.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="mt-16 flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
              <SearchX className="h-10 w-10 text-muted-foreground" />
              <h2 className="mt-4 text-lg font-semibold">No products match those filters</h2>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Try a shorter search term, a wider price range, or clear the filters to start again.
              </p>
              <Button className="mt-6 rounded-full bg-cherry text-cherry-foreground hover:bg-cherry/90" onClick={reset}>
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {results.slice(0, visible).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {visible < results.length && (
                <div className="mt-10 flex flex-col items-center gap-3">
                  <p className="text-xs text-muted-foreground">
                    Showing {Math.min(visible, results.length)} of {results.length}
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full px-8"
                    onClick={() => setVisible((v) => v + PAGE)}
                  >
                    Load more
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
