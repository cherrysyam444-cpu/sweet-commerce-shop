import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { categories } from "@/lib/catalog";

const payments = ["Visa", "Mastercard", "Amex", "PayPal", "UPI", "Apple Pay"];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-cherry text-sm font-black text-cherry-foreground">
              C
            </span>
            <span className="font-display text-lg font-semibold">CHERRY SHOP</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Considered products across tech, wardrobe and home — curated, fairly priced and shipped
            fast from our Brooklyn warehouse.
          </p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="https://example.com"
                aria-label="CHERRY SHOP social profile"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-cherry hover:text-cherry"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/shop" className="hover:text-cherry">
                All products
              </Link>
            </li>
            <li>
              <Link to="/deals" className="hover:text-cherry">
                Deals & offers
              </Link>
            </li>
            {categories.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link
                  to="/categories/$categorySlug"
                  params={{ categorySlug: c.slug }}
                  className="hover:text-cherry"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-cherry">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cherry">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/account" className="hover:text-cherry">
                My account
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-cherry">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">Policies</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Free shipping over $150</li>
            <li>30-day easy returns</li>
            <li>2-year warranty on tech</li>
            <li>Privacy & cookie policy</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {payments.map((p) => (
              <span
                key={p}
                className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CHERRY SHOP. All prices in USD. Demo store — orders are simulated.
      </div>
    </footer>
  );
}
