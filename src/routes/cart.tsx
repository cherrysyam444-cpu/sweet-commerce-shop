import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — CHERRY SHOP" },
      {
        name: "description",
        content: "Review your CHERRY SHOP cart, adjust quantities and see your subtotal, shipping and tax before checkout.",
      },
      { property: "og:title", content: "Your Cart — CHERRY SHOP" },
      { property: "og:description", content: "Review your bag and check out in four quick steps." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartDetail, totals, setQuantity, removeLine, hydrated } = useStore();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Skeleton className="h-10 w-48" />
        <div className="mt-8 space-y-4">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (cartDetail.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        <h1 className="mt-5 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a few favourites and they'll wait here for you — even if you close the tab.
        </p>
        <Button asChild className="mt-7 rounded-full bg-cherry px-8 text-cherry-foreground hover:bg-cherry/90">
          <Link to="/shop">Start shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Your cart</h1>
      <p className="mt-2 text-sm text-muted-foreground">{cartDetail.length} line items</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <ul className="space-y-4">
          {cartDetail.map(({ line, product }) => (
            <li
              key={line.id}
              className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-card sm:grid-cols-[110px_minmax(0,1fr)_auto]"
            >
              <Link to="/product/$productId" params={{ productId: product.id }} className="shrink-0">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-24 w-full rounded-xl object-cover sm:h-28"
                />
              </Link>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {product.brand}
                </p>
                <Link
                  to="/product/$productId"
                  params={{ productId: product.id }}
                  className="line-clamp-2 text-sm font-semibold hover:text-cherry"
                >
                  {product.name}
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">
                  {[line.color, line.size].filter(Boolean).join(" · ") || "Standard"}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center rounded-full border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity(line.id, line.quantity - 1)}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-8 text-center text-sm font-semibold">{line.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity(line.id, line.quantity + 1)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(line.id)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-cherry"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
              <div className="col-span-2 text-right sm:col-span-1">
                <p className="text-base font-bold">{formatPrice(product.price * line.quantity)}</p>
                <p className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice * line.quantity)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-border/70 bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">{formatPrice(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Discount saved</dt>
              <dd className="font-medium text-sale">−{formatPrice(totals.savings)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium">
                {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax (8%)</dt>
              <dd className="font-medium">{formatPrice(totals.tax)}</dd>
            </div>
            <Separator />
            <div className="flex justify-between text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-bold">{formatPrice(totals.total)}</dd>
            </div>
          </dl>
          {totals.shipping > 0 && (
            <p className="mt-4 rounded-xl bg-cherry-soft px-3 py-2 text-xs text-cherry">
              Add {formatPrice(150 - totals.subtotal)} more for free shipping.
            </p>
          )}
          <Button asChild size="lg" className="mt-6 w-full rounded-full bg-cherry text-cherry-foreground hover:bg-cherry/90">
            <Link to="/checkout">Proceed to checkout</Link>
          </Button>
          <Button asChild variant="ghost" className="mt-2 w-full rounded-full">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
