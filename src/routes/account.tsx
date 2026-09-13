import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice, getProduct } from "@/lib/catalog";
import { useStore } from "@/lib/store";

type Search = { tab?: string | undefined };

export const Route = createFileRoute("/account")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    tab: typeof search["tab"] === "string" && search["tab"] ? (search["tab"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "My Account — CHERRY SHOP" },
      { name: "description", content: "Manage your CHERRY SHOP profile, order history, saved addresses, wishlist and preferences." },
      { property: "og:title", content: "My Account — CHERRY SHOP" },
      { property: "og:description", content: "Your profile, orders and saved addresses in one place." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { tab } = Route.useSearch();
  const { account, saveAccount, orders, wishlist, addresses, addAddress, removeAddress, toggleWishlist } = useStore();
  const [profile, setProfile] = useState({ name: account.name, email: account.email, phone: account.phone });
  const [addr, setAddr] = useState({ label: "", line1: "", city: "", postcode: "", country: "United States" });
  const [prefs, setPrefs] = useState({ emails: true, sms: false });

  const saved = wishlist.map(getProduct).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cherry text-lg font-black text-cherry-foreground">
            {(account.name || "C")[0]}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold sm:text-3xl">{account.name || "Cherry Guest"}</h1>
            <p className="truncate text-sm text-muted-foreground">{account.email}</p>
          </div>
        </div>
        <Badge variant="secondary" className="shrink-0">
          {account.signedIn ? "Signed in" : "Guest"}
        </Badge>
      </div>

      <Tabs defaultValue={tab ?? "profile"} className="mt-8">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <div className="max-w-lg space-y-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card">
            <div>
              <Label htmlFor="acc-name">Full name</Label>
              <Input id="acc-name" className="mt-1.5" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="acc-email">Email</Label>
              <Input id="acc-email" type="email" className="mt-1.5" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="acc-phone">Phone</Label>
              <Input id="acc-phone" className="mt-1.5" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </div>
            <Button
              className="rounded-full bg-cherry text-cherry-foreground hover:bg-cherry/90"
              onClick={() => {
                saveAccount({ ...profile, signedIn: true });
                toast.success("Profile saved");
              }}
            >
              Save changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-sm text-muted-foreground">No orders yet.</p>
              <Button asChild className="mt-5 rounded-full bg-cherry text-cherry-foreground hover:bg-cherry/90">
                <Link to="/shop">Start shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {orders.map((o) => (
                <li key={o.id} className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{o.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(o.date).toLocaleDateString()} · {o.items.length} item
                        {o.items.length === 1 ? "" : "s"} · {o.payment}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <Badge variant="secondary">{o.status}</Badge>
                      <p className="mt-1 text-sm font-bold">{formatPrice(o.total)}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 overflow-x-auto">
                    {o.items.map((it, i) => (
                      <img key={i} src={it.image} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                    ))}
                  </div>
                  <Button asChild variant="link" className="mt-2 h-auto px-0 text-cherry">
                    <Link to="/order-confirmation" search={{ orderId: o.id }}>
                      View confirmation
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="wishlist" className="mt-6">
          {saved.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              Your wishlist is empty.
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {saved.map((p) => (
                <li key={p.id} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-card">
                  <img src={p.images[0]} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <Link to="/product/$productId" params={{ productId: p.id }} className="line-clamp-2 text-sm font-semibold hover:text-cherry">
                      {p.name}
                    </Link>
                    <p className="text-sm font-bold">{formatPrice(p.price)}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toggleWishlist(p.id)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="addresses" className="mt-6 space-y-6">
          <ul className="grid gap-4 sm:grid-cols-2">
            {addresses.map((a) => (
              <li key={a.id} className="rounded-2xl border border-border/70 bg-card p-5 text-sm shadow-card">
                <p className="font-semibold">{a.label || "Address"}</p>
                <p className="mt-1 text-muted-foreground">{a.line1}</p>
                <p className="text-muted-foreground">
                  {a.city} {a.postcode}
                </p>
                <p className="text-muted-foreground">{a.country}</p>
                <Button variant="ghost" size="sm" className="mt-3 px-0 text-cherry" onClick={() => removeAddress(a.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <form
            className="max-w-lg space-y-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card"
            onSubmit={(e) => {
              e.preventDefault();
              addAddress(addr);
              setAddr({ label: "", line1: "", city: "", postcode: "", country: "United States" });
            }}
          >
            <h2 className="text-lg font-semibold">Add an address</h2>
            <Input required placeholder="Label (Home, Office)" value={addr.label} onChange={(e) => setAddr({ ...addr, label: e.target.value })} />
            <Input required placeholder="Street address" value={addr.line1} onChange={(e) => setAddr({ ...addr, line1: e.target.value })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input required placeholder="City" value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} />
              <Input required placeholder="ZIP / Postcode" value={addr.postcode} onChange={(e) => setAddr({ ...addr, postcode: e.target.value })} />
            </div>
            <Button type="submit" className="rounded-full bg-cherry text-cherry-foreground hover:bg-cherry/90">
              Save address
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="max-w-lg space-y-5 rounded-2xl border border-border/70 bg-card p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold">Email updates</p>
                <p className="text-xs text-muted-foreground">New drops, restocks and offers.</p>
              </div>
              <Switch checked={prefs.emails} onCheckedChange={(v) => setPrefs({ ...prefs, emails: v })} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold">SMS delivery alerts</p>
                <p className="text-xs text-muted-foreground">Texts when your parcel is out for delivery.</p>
              </div>
              <Switch checked={prefs.sms} onCheckedChange={(v) => setPrefs({ ...prefs, sms: v })} />
            </div>
            <Button variant="outline" className="rounded-full" onClick={() => toast.success("Preferences updated")}>
              Save preferences
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
