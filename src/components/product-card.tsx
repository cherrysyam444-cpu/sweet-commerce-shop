import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import { discountPercent, formatPrice, categoryName, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const saved = inWishlist(product.id);
  const off = discountPercent(product);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="relative block aspect-[4/5] overflow-hidden bg-muted"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {off > 0 && (
            <Badge className="bg-cherry text-cherry-foreground hover:bg-cherry">-{off}%</Badge>
          )}
          {product.badge && (
            <Badge variant="secondary" className="bg-card/90 text-foreground backdrop-blur">
              {product.badge}
            </Badge>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        aria-pressed={saved}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-foreground shadow-card backdrop-blur transition-colors hover:text-cherry"
      >
        <Heart className={cn("h-4 w-4", saved && "fill-cherry text-cherry")} />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {product.brand} · {categoryName(product.category)}
        </p>
        <Link
          to="/product/$productId"
          params={{ productId: product.id }}
          className="line-clamp-2 text-sm font-semibold leading-snug transition-colors hover:text-cherry"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <StarRating rating={product.rating} />
          <span>
            {product.rating.toFixed(1)} ({product.reviews.toLocaleString()})
          </span>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="min-w-0">
            <span className="text-lg font-bold tracking-tight">{formatPrice(product.price)}</span>
            <span className="ml-2 text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>
          <Button
            size="icon"
            className="h-9 w-9 shrink-0 rounded-full bg-ink text-primary-foreground hover:bg-cherry"
            onClick={() => addToCart(product.id)}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
