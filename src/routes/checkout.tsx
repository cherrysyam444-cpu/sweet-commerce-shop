import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, CreditCard, Banknote, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — CHERRY SHOP" },
      {
        name: "description",
        content: "Four quick steps: your details, shipping address, payment method and a final review before you order.",
      },
      { property: "og:title", content: "Secure Checkout — CHERRY SHOP" },
      { property: "og:description", content: "Fast, secure checkout at CHERRY SHOP." },
    ],
  }),
  component: CheckoutPage,
});

const steps = ["Your details", "Shipping", "Payment", "Review"];

const payments = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, hint: "Visa, Mastercard, Amex" },
  { id: "upi", label: "UPI", icon: Smartphone, hint: "Pay from any UPI app" },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, hint: "Pay the courier on arrival" },
];

function CheckoutPage() {
  const { cartDetail, totals, placeOrder, account, saveAccount } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: account.signedIn ? account.name : "",
    email: account.signedIn ? account.email : "",
    phone: account.phone,
    line1: "",
    city: "",
    postcode: "",
    country: "United States",
    payment: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    upiId: "",
  });

  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  if (cartDetail.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Add something you love before checking out.</p>
        <Button asChild className="mt-7 rounded-full bg-cherry px-8 text-cherry-foreground hover:bg-cherry/90">
          <Link to="/shop">Go to shop</Link>
        </Button>
      </div>
    );
  }

  const valid = () => {
    if (step === 0) return Boolean(form.name && form.email.includes("@") && form.phone.length >= 6);
    if (step === 1) return Boolean(form.line1 && form.city && form.postcode);
    if (step === 2) {
      if (form.payment === "card") return form.cardNumber.replace(/\s/g, "").length >= 12 && form.cardExpiry.length >= 4 && form.cardCvc.length >= 3;
      if (form.payment === "upi") return form.upiId.includes("@");
      return true;
    }
    return true;
  };

  const next = () => {
    if (!valid()) {
      toast.error("Please complete the fields on this step");
      return;
    }
    if (step === 0) saveAccount({ name: form.name, email: form.email, phone: form.phone, signedIn: true });
    setStep((s) => Math.min(3, s + 1));
  };

  const submit = () => {
    const order = placeOrder({
      total: totals.total,
      items: cartDetail.map(({ line, product }) => ({
        name: product.name,
        quantity: line.quantity,
        price: product.price,
        image: product.images[0] ?? "",
      })),
      address: `${form.name}, ${form.line1}, ${form.city} ${form.postcode}, ${form.country}`,
      payment: payments.find((p) => p.id === form.payment)?.label ?? "Card",
    });
    toast.success("Order placed", { description: `Confirmation ${order.id}` });
    navigate({ to: "/order-confirmation", search: { orderId: order.id } });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Checkout</h1>

      <ol className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {steps.map((s, i) => (
          <li
            key={s}
            className={cn(
              "flex min-w-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold",
              i === step
                ? "border-cherry bg-cherry-soft text-cherry"
                : i < step
                  ? "border-sale/40 bg-card text-sale"
                  : "border-border bg-card text-muted-foreground",
            )}
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-current text-[10px]">
              {i < step ? <Check className="h-3 w-3" /> : i + 1}
            </span>
            <span className="truncate">{s}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-card">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Your details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" className="mt-1.5" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Alex Morgan" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" className="mt-1.5" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 555 010 2030" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" className="mt-1.5" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Shipping address</h2>
              <div>
                <Label htmlFor="line1">Street address</Label>
                <Input id="line1" className="mt-1.5" value={form.line1} onChange={(e) => set("line1", e.target.value)} placeholder="14 Rosewood Lane, Apt 3B" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" className="mt-1.5" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Brooklyn, NY" />
                </div>
                <div>
                  <Label htmlFor="postcode">ZIP / Postcode</Label>
                  <Input id="postcode" className="mt-1.5" value={form.postcode} onChange={(e) => set("postcode", e.target.value)} placeholder="11221" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" className="mt-1.5" value={form.country} onChange={(e) => set("country", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">Payment method</h2>
              <RadioGroup value={form.payment} onValueChange={(v) => set("payment", v)} className="gap-3">
                {payments.map((p) => (
                  <Label
                    key={p.id}
                    htmlFor={`pay-${p.id}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors",
                      form.payment === p.id ? "border-cherry bg-cherry-soft" : "border-border hover:border-cherry",
                    )}
                  >
                    <RadioGroupItem value={p.id} id={`pay-${p.id}`} />
                    <p.icon className="h-5 w-5 shrink-0 text-cherry" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{p.label}</span>
                      <span className="block text-xs font-normal text-muted-foreground">{p.hint}</span>
                    </span>
                  </Label>
                ))}
              </RadioGroup>

              {form.payment === "card" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="card">Card number</Label>
                    <Input id="card" className="mt-1.5" inputMode="numeric" value={form.cardNumber} onChange={(e) => set("cardNumber", e.target.value)} placeholder="4242 4242 4242 4242" />
                  </div>
                  <div>
                    <Label htmlFor="exp">Expiry</Label>
                    <Input id="exp" className="mt-1.5" value={form.cardExpiry} onChange={(e) => set("cardExpiry", e.target.value)} placeholder="09/29" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" className="mt-1.5" value={form.cardCvc} onChange={(e) => set("cardCvc", e.target.value)} placeholder="123" />
                  </div>
                </div>
              )}

              {form.payment === "upi" && (
                <div>
                  <Label htmlFor="upi">UPI ID</Label>
                  <Input id="upi" className="mt-1.5" value={form.upiId} onChange={(e) => set("upiId", e.target.value)} placeholder="name@bank" />
                </div>
              )}

              {form.payment === "cod" && (
                <p className="rounded-xl bg-secondary px-4 py-3 text-sm text-muted-foreground">
                  Pay in cash when your parcel arrives. A $2 handling fee may apply in some areas.
                </p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">Review your order</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-secondary/60 p-4 text-sm">
                  <p className="font-semibold">Contact</p>
                  <p className="mt-1 text-muted-foreground">{form.name}</p>
                  <p className="text-muted-foreground">{form.email}</p>
                  <p className="text-muted-foreground">{form.phone}</p>
                </div>
                <div className="rounded-xl bg-secondary/60 p-4 text-sm">
                  <p className="font-semibold">Shipping to</p>
                  <p className="mt-1 text-muted-foreground">{form.line1}</p>
                  <p className="text-muted-foreground">
                    {form.city} {form.postcode}
                  </p>
                  <p className="text-muted-foreground">{form.country}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Paying with{" "}
                <span className="font-semibold text-foreground">
                  {payments.find((p) => p.id === form.payment)?.label}
                </span>
              </p>
              <ul className="divide-y divide-border rounded-xl border border-border">
                {cartDetail.map(({ line, product }) => (
                  <li key={line.id} className="flex items-center gap-3 p-3">
                    <img src={product.images[0]} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{product.name}</span>
                      <span className="block text-xs text-muted-foreground">Qty {line.quantity}</span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold">
                      {formatPrice(product.price * line.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {step > 0 && (
              <Button variant="outline" className="rounded-full" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button className="rounded-full bg-ink px-8 text-primary-foreground hover:bg-ink/90" onClick={next}>
                Continue
              </Button>
            ) : (
              <Button
                size="lg"
                className="rounded-full bg-cherry px-8 text-cherry-foreground hover:bg-cherry/90"
                onClick={submit}
              >
                Place Order · {formatPrice(totals.total)}
              </Button>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border/70 bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold">Summary</h2>
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
              <dd className="font-medium">{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd className="font-medium">{formatPrice(totals.tax)}</dd>
            </div>
            <Separator />
            <div className="flex justify-between text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-bold">{formatPrice(totals.total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
