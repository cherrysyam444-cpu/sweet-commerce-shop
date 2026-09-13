import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { getProduct, type Product } from "./catalog";

export type CartLine = {
  id: string;
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
};

export type Address = {
  id: string;
  label: string;
  line1: string;
  city: string;
  postcode: string;
  country: string;
};

export type Order = {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  total: number;
  items: { name: string; quantity: number; price: number; image: string }[];
  address: string;
  estimatedDelivery: string;
  payment: string;
};

export type Account = {
  name: string;
  email: string;
  phone: string;
  signedIn: boolean;
};

type State = {
  cart: CartLine[];
  wishlist: string[];
  orders: Order[];
  addresses: Address[];
  account: Account;
  newsletter: boolean;
};

const KEY = "cherry-shop-state-v1";

const defaultState: State = {
  cart: [],
  wishlist: [],
  orders: [],
  addresses: [
    {
      id: "addr-home",
      label: "Home",
      line1: "14 Rosewood Lane, Apt 3B",
      city: "Brooklyn, NY",
      postcode: "11221",
      country: "United States",
    },
  ],
  account: { name: "Cherry Guest", email: "guest@cherryshop.com", phone: "", signedIn: false },
  newsletter: false,
};

type StoreValue = State & {
  hydrated: boolean;
  cartCount: number;
  wishlistCount: number;
  cartDetail: { line: CartLine; product: Product }[];
  totals: { subtotal: number; savings: number; shipping: number; tax: number; total: number };
  addToCart: (
    productId: string,
    options?: { quantity?: number; color?: string; size?: string; silent?: boolean },
  ) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  inWishlist: (productId: string) => boolean;
  moveToCart: (productId: string) => void;
  placeOrder: (order: Omit<Order, "id" | "date" | "status" | "estimatedDelivery">) => Order;
  saveAccount: (patch: Partial<Account>) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  subscribeNewsletter: (email: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...defaultState, ...(JSON.parse(raw) as State) });
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const cartDetail = useMemo(
    () =>
      state.cart
        .map((line) => ({ line, product: getProduct(line.productId) }))
        .filter((x): x is { line: CartLine; product: Product } => Boolean(x.product)),
    [state.cart],
  );

  const totals = useMemo(() => {
    const subtotal = cartDetail.reduce((sum, x) => sum + x.product.price * x.line.quantity, 0);
    const savings = cartDetail.reduce(
      (sum, x) => sum + (x.product.originalPrice - x.product.price) * x.line.quantity,
      0,
    );
    const shipping = subtotal === 0 || subtotal >= 150 ? 0 : 9;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    return { subtotal, savings, shipping, tax, total: subtotal + shipping + tax };
  }, [cartDetail]);

  const addToCart = useCallback<StoreValue["addToCart"]>((productId, options = {}) => {
    const { quantity = 1, color, size, silent } = options;
    const product = getProduct(productId);
    setState((prev) => {
      const key = `${productId}|${color ?? ""}|${size ?? ""}`;
      const existing = prev.cart.find((l) => `${l.productId}|${l.color ?? ""}|${l.size ?? ""}` === key);
      const cart = existing
        ? prev.cart.map((l) => (l.id === existing.id ? { ...l, quantity: l.quantity + quantity } : l))
        : [...prev.cart, { id: `line-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, productId, quantity, color, size }];
      return { ...prev, cart };
    });
    if (!silent && product) toast.success(`${product.name} added to your cart`);
  }, []);

  const setQuantity = useCallback<StoreValue["setQuantity"]>((lineId, quantity) => {
    setState((prev) => ({
      ...prev,
      cart:
        quantity <= 0
          ? prev.cart.filter((l) => l.id !== lineId)
          : prev.cart.map((l) => (l.id === lineId ? { ...l, quantity } : l)),
    }));
  }, []);

  const removeLine = useCallback<StoreValue["removeLine"]>((lineId) => {
    setState((prev) => ({ ...prev, cart: prev.cart.filter((l) => l.id !== lineId) }));
    toast("Removed from cart");
  }, []);

  const clearCart = useCallback(() => setState((prev) => ({ ...prev, cart: [] })), []);

  const toggleWishlist = useCallback<StoreValue["toggleWishlist"]>((productId) => {
    const product = getProduct(productId);
    setState((prev) => {
      const has = prev.wishlist.includes(productId);
      if (product) {
        if (has) toast(`${product.name} removed from wishlist`);
        else toast.success(`${product.name} saved to wishlist`);
      }
      return {
        ...prev,
        wishlist: has ? prev.wishlist.filter((id) => id !== productId) : [...prev.wishlist, productId],
      };
    });
  }, []);

  const inWishlist = useCallback((productId: string) => state.wishlist.includes(productId), [state.wishlist]);

  const moveToCart = useCallback<StoreValue["moveToCart"]>(
    (productId) => {
      addToCart(productId, { silent: true });
      setState((prev) => ({ ...prev, wishlist: prev.wishlist.filter((id) => id !== productId) }));
      toast.success("Moved to your cart");
    },
    [addToCart],
  );

  const placeOrder = useCallback<StoreValue["placeOrder"]>((draft) => {
    const now = new Date();
    const delivery = new Date(now.getTime() + 4 * 86400000);
    const order: Order = {
      ...draft,
      id: `CHS-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}-${Math.floor(Math.random() * 90000 + 10000)}`,
      date: now.toISOString(),
      status: "Processing",
      estimatedDelivery: delivery.toISOString(),
    };
    setState((prev) => ({ ...prev, orders: [order, ...prev.orders], cart: [] }));
    return order;
  }, []);

  const saveAccount = useCallback<StoreValue["saveAccount"]>((patch) => {
    setState((prev) => ({ ...prev, account: { ...prev.account, ...patch } }));
  }, []);

  const addAddress = useCallback<StoreValue["addAddress"]>((address) => {
    setState((prev) => ({
      ...prev,
      addresses: [...prev.addresses, { ...address, id: `addr-${Date.now()}` }],
    }));
    toast.success("Address saved");
  }, []);

  const removeAddress = useCallback<StoreValue["removeAddress"]>((id) => {
    setState((prev) => ({ ...prev, addresses: prev.addresses.filter((a) => a.id !== id) }));
    toast("Address removed");
  }, []);

  const subscribeNewsletter = useCallback<StoreValue["subscribeNewsletter"]>((email) => {
    setState((prev) => ({ ...prev, newsletter: true }));
    toast.success("You're on the list", { description: `We'll send new drops to ${email}.` });
  }, []);

  const value: StoreValue = {
    ...state,
    hydrated,
    cartDetail,
    totals,
    cartCount: state.cart.reduce((n, l) => n + l.quantity, 0),
    wishlistCount: state.wishlist.length,
    addToCart,
    setQuantity,
    removeLine,
    clearCart,
    toggleWishlist,
    inWishlist,
    moveToCart,
    placeOrder,
    saveAccount,
    addAddress,
    removeAddress,
    subscribeNewsletter,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
