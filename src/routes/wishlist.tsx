import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import { formatPrice, getProduct } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — CHERRY SHOP" },
      {
        name: "description",
        content: "Everything you've saved at CHERRY SHOP. Move items straight to your cart or remove them in a tap.",
      },
      { property: "og:title", content: "Your Wishlist — CHERRY SHOP" },
      { property: "og:description", content: "Saved products, ready when you are." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, toggleWishlist, moveToCart } = useStore();
  const items = wishlist.map(getProduct).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <Heart className="h-12 w-12 text-muted-foreground" />
        <h1 className="mt-5 text-2xl font-bold">Nothing saved yet</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tap the heart on any product to keep it here for later.
        </p>
        <Button asChild className="mt-7 rounded-full bg-cherry px-8 text-cherry-foreground hover:bg-cherry/90">
          <Link to="/shop">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Your wishlist</h1>
      <p className="mt-2 text-sm text-muted-foreground">{items.length} saved item{items.length === 1 ? "" : "s"}</p>

      <ul className="mt-8 space-y-4">
        {items.map((p) => (
          <li
            key={p.id}
            className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-card sm:grid-cols-[110px_minmax(0,1fr)_auto] sm:items-center"
          >
            <Link to="/product/$productId" params={{ productId: p.id }}>
              <img src={p.images[0]} alt={p.name} className="h-24 w-full rounded-xl object-cover" />
            </Link>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {p.brand}
              </p>
              <Link
                to="/product/$productId"
                params={{ productId: p.id }}
                className="line-clamp-2 text-sm font-semibold hover:text-cherry"
              >
                {p.name}
              </Link>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <StarRating rating={p.rating} /> {p.rating.toFixed(1)}
              </div>
              <p className="mt-2 text-base font-bold">{formatPrice(p.price)}</p>
            </div>
            <div className="col-span-2 flex flex-wrap gap-2 sm:col-span-1 sm:flex-col">
              <Button
                className="rounded-full bg-cherry text-cherry-foreground hover:bg-cherry/90"
                onClick={() => moveToCart(p.id)}
              >
                Move to cart
              </Button>
              <Button variant="outline" className="rounded-full" onClick={() => toggleWishlist(p.id)}>
                <Trash2 className="mr-1 h-4 w-4" /> Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
