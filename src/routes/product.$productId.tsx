import { useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Heart, Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/product-card";
import { StarRating } from "@/components/star-rating";
import {
  categoryName,
  discountPercent,
  formatPrice,
  getProduct,
  relatedProducts,
} from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product unavailable — CHERRY SHOP" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — CHERRY SHOP`;
    const description = product.description.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: product.images[0] },
        { name: "twitter:image", content: product.images[0] },
      ],
    };
  },
  component: ProductPage,
});

const reviewsSample = [
  { name: "Priya N.", rating: 5, text: "Exactly as described and delivered a day early. Would buy again." },
  { name: "Marcus T.", rating: 4, text: "Great quality for the price. Sizing runs slightly large for me." },
  { name: "Elena V.", rating: 5, text: "Packaging was beautiful and the finish feels far more expensive." },
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const navigate = useNavigate();
  const [image, setImage] = useState(0);
  const [color, setColor] = useState(product.colors?.[0]);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const off = discountPercent(product);
  const saved = inWishlist(product.id);

  const buyNow = () => {
    addToCart(product.id, { quantity: qty, color, size, silent: true });
    navigate({ to: "/checkout" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-cherry">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-cherry">Shop</Link>
        <span>/</span>
        <Link
          to="/categories/$categorySlug"
          params={{ categorySlug: product.category }}
          className="hover:text-cherry"
        >
          {categoryName(product.category)}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="group overflow-hidden rounded-3xl border border-border/70 bg-muted shadow-card">
            <img
              src={product.images[image]}
              alt={product.name}
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-125"
            />
          </div>
          <div className="mt-4 flex gap-3">
            {product.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setImage(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors",
                  i === image ? "border-cherry" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {product.brand}
            </p>
            {product.badge && <Badge variant="secondary">{product.badge}</Badge>}
          </div>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <StarRating rating={product.rating} size={16} />
            <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
            <span>· {product.reviews.toLocaleString()} reviews</span>
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-3">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            <span className="text-base text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
            {off > 0 && <Badge className="bg-cherry text-cherry-foreground hover:bg-cherry">Save {off}%</Badge>}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          {product.colors && (
            <div className="mt-7">
              <p className="text-sm font-semibold">Colour: <span className="font-normal text-muted-foreground">{color}</span></p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition-colors",
                      c === color ? "border-cherry bg-cherry-soft text-cherry" : "border-border hover:border-cherry",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="mt-6">
              <p className="text-sm font-semibold">Size: <span className="font-normal text-muted-foreground">{size}</span></p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-12 rounded-lg border px-3 py-2 text-sm transition-colors",
                      s === size ? "border-cherry bg-cherry-soft text-cherry" : "border-border hover:border-cherry",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-border">
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(10, q + 1))}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">In stock · ships within 24 hours</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="flex-1 rounded-full bg-ink text-primary-foreground hover:bg-ink/90"
              onClick={() => addToCart(product.id, { quantity: qty, color, size })}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              className="flex-1 rounded-full bg-cherry text-cherry-foreground hover:bg-cherry/90"
              onClick={buyNow}
            >
              Buy Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              aria-pressed={saved}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart className={cn("mr-2 h-4 w-4", saved && "fill-cherry text-cherry")} />
              {saved ? "Saved" : "Wishlist"}
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, label: "Free delivery over $150" },
              { icon: RotateCcw, label: "30-day free returns" },
              { icon: ShieldCheck, label: "2-year warranty" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2 rounded-xl border border-border/70 bg-card p-3 text-xs">
                <f.icon className="h-4 w-4 shrink-0 text-cherry" />
                <span className="min-w-0">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue="specs" className="mt-16">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="specs" className="mt-6">
          <dl className="max-w-xl divide-y divide-border rounded-2xl border border-border/70 bg-card">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-6 px-5 py-3 text-sm">
                <dt className="text-muted-foreground">{s.label}</dt>
                <dd className="text-right font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>
        </TabsContent>
        <TabsContent value="shipping" className="mt-6 max-w-2xl space-y-3 text-sm text-muted-foreground">
          <p>Orders placed before 3pm ET are dispatched the same working day from Brooklyn.</p>
          <p>Standard delivery is 3–5 working days ($9, free over $150). Express is 1–2 days ($19).</p>
          <p>Every parcel ships with tracking and a signature-free option at your door.</p>
        </TabsContent>
        <TabsContent value="returns" className="mt-6 max-w-2xl space-y-3 text-sm text-muted-foreground">
          <p>Return anything unused within 30 days for a full refund — we cover the return label.</p>
          <p>Refunds are issued to your original payment method within 3 working days of arrival.</p>
          <p>Faulty items are covered by a two-year warranty with free replacement.</p>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6 space-y-4">
          {reviewsSample.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border/70 bg-card p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cherry-soft text-sm font-bold text-cherry">
                  {r.name[0]}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{r.name}</p>
                  <StarRating rating={r.rating} />
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <Separator className="my-14" />

      <section>
        <h2 className="text-2xl font-bold">You may also like</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {relatedProducts(product).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
