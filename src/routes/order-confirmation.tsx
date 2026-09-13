import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/lib/store";

type Search = { orderId?: string | undefined };

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    orderId:
      typeof search["orderId"] === "string" && search["orderId"]
        ? (search["orderId"] as string)
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — CHERRY SHOP" },
      { name: "description", content: "Your CHERRY SHOP order is confirmed. Track your items and estimated delivery date." },
      { property: "og:title", content: "Order Confirmed — CHERRY SHOP" },
      { property: "og:description", content: "Thanks for your order — here are the details." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfirmationPage,
});

const dateFmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "long", year: "numeric" });

function ConfirmationPage() {
  const { orderId } = Route.useSearch();
  const { orders, hydrated } = useStore();
  const order = orderId ? orders.find((o) => o.id === orderId) : orders[0];

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Skeleton className="mx-auto h-14 w-14 rounded-full" />
        <Skeleton className="mx-auto mt-6 h-8 w-64" />
        <Skeleton className="mt-10 h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">No order to show</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Once you place an order, the confirmation will appear here.
        </p>
        <Button asChild className="mt-7 rounded-full bg-cherry px-8 text-cherry-foreground hover:bg-cherry/90">
          <Link to="/shop">Start shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cherry-soft text-cherry">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Thank you, your order is confirmed</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          A receipt is on its way to your inbox. Order <span className="font-semibold text-foreground">{order.id}</span>
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Package, label: "Order date", value: dateFmt(order.date) },
          { icon: Truck, label: "Estimated delivery", value: dateFmt(order.estimatedDelivery) },
          { icon: CheckCircle2, label: "Status", value: order.status },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
            <c.icon className="h-5 w-5 text-cherry" />
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">{c.label}</p>
            <p className="mt-1 text-sm font-semibold">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-border/70 bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold">Items</h2>
        <ul className="mt-4 divide-y divide-border">
          {order.items.map((item, i) => (
            <li key={`${item.name}-${i}`} className="flex items-center gap-3 py-3">
              <img src={item.image} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{item.name}</span>
                <span className="block text-xs text-muted-foreground">Qty {item.quantity}</span>
              </span>
              <span className="shrink-0 text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <div className="flex justify-between text-base">
          <span className="font-semibold">Order total</span>
          <span className="font-bold">{formatPrice(order.total)}</span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm">
          <div className="rounded-xl bg-secondary/60 p-4">
            <p className="font-semibold">Delivery address</p>
            <p className="mt-1 text-muted-foreground">{order.address}</p>
          </div>
          <div className="rounded-xl bg-secondary/60 p-4">
            <p className="font-semibold">Payment</p>
            <p className="mt-1 text-muted-foreground">{order.payment}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild className="rounded-full bg-cherry px-7 text-cherry-foreground hover:bg-cherry/90">
          <Link to="/account" search={{ tab: "orders" }}>
            View order history
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full px-7">
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}
