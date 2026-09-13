export type Category = {
  slug: string;
  name: string;
  image: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge?: "New" | "Bestseller" | "Limited" | "Hot";
  images: string[];
  colors?: string[];
  sizes?: string[];
  description: string;
  specs: { label: string; value: string }[];
  popularity: number;
  createdAt: string;
  keywords: string[];
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const categories: Category[] = [
  {
    slug: "electronics",
    name: "Electronics",
    image: img("photo-1505740420928-5e560c06d30e"),
    description:
      "Audio, wearables and everyday tech chosen for build quality and battery life.",
  },
  {
    slug: "fashion",
    name: "Fashion",
    image: img("photo-1489987707025-afc232f7ea0f"),
    description: "Wardrobe staples in natural fabrics, cut to last more than one season.",
  },
  {
    slug: "shoes",
    name: "Shoes",
    image: img("photo-1542291026-7eec264c27ff"),
    description: "Runners, trainers and everyday sneakers with real cushioning.",
  },
  {
    slug: "watches",
    name: "Watches",
    image: img("photo-1523275335684-37898b6baf30"),
    description: "Automatic, quartz and smart — timepieces with a considered finish.",
  },
  {
    slug: "beauty",
    name: "Beauty",
    image: img("photo-1596462502278-27bfdc403348"),
    description: "Skincare and fragrance with short ingredient lists and honest claims.",
  },
  {
    slug: "home-kitchen",
    name: "Home & Kitchen",
    image: img("photo-1556909212-d5b604d0c90d"),
    description: "Pieces that make a room work: cookware, lighting and soft furnishing.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    image: img("photo-1553062407-98eeb64c6a62"),
    description: "Bags, eyewear and small leather goods that finish an outfit.",
  },
  {
    slug: "fitness",
    name: "Fitness",
    image: img("photo-1571019613454-1cb2f99b2d8b"),
    description: "Home gym essentials built for daily use, not for a display shelf.",
  },
];

export const categoryName = (slug: string) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;

type Seed = Omit<Product, "keywords">;

const seeds: Seed[] = [
  {
    id: "aurora-anc-headphones",
    name: "Aurora ANC Over-Ear Headphones",
    brand: "Nordwave",
    category: "electronics",
    price: 189,
    originalPrice: 279,
    rating: 4.8,
    reviews: 1243,
    badge: "Bestseller",
    images: [
      img("photo-1505740420928-5e560c06d30e"),
      img("photo-1583394838336-acd977736f90"),
      img("photo-1484704849700-f032a568e944"),
    ],
    colors: ["Midnight", "Sand", "Slate"],
    description:
      "Hybrid active noise cancelling, 40 hours of playback and memory-foam ear cups that stay comfortable through a long-haul flight.",
    specs: [
      { label: "Driver", value: "40mm dynamic" },
      { label: "Battery", value: "40h ANC on" },
      { label: "Codec", value: "LDAC, AAC, SBC" },
      { label: "Weight", value: "268 g" },
    ],
    popularity: 98,
    createdAt: "2026-06-02",
  },
  {
    id: "pulse-buds-pro",
    name: "Pulse Buds Pro Wireless Earbuds",
    brand: "Nordwave",
    category: "electronics",
    price: 89,
    originalPrice: 149,
    rating: 4.6,
    reviews: 872,
    badge: "Hot",
    images: [img("photo-1590658268037-6bf12165a8df"), img("photo-1606220945770-b5b6c2c55bf1")],
    colors: ["White", "Black"],
    description:
      "Compact buds with adaptive transparency, wireless charging case and a secure fit for running.",
    specs: [
      { label: "Battery", value: "8h + 24h case" },
      { label: "Rating", value: "IPX5 sweat resistant" },
      { label: "Charging", value: "USB-C / Qi" },
    ],
    popularity: 91,
    createdAt: "2026-05-14",
  },
  {
    id: "lumen-13-laptop",
    name: 'Lumen 13" Ultralight Laptop',
    brand: "Kestrel",
    category: "electronics",
    price: 1099,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 415,
    images: [img("photo-1517336714731-489689fd1ca8"), img("photo-1496181133206-80ce9b88a853")],
    colors: ["Silver", "Graphite"],
    description:
      "A 1.1 kg aluminium body, 18-hour battery and a colour-accurate display for editing on the move.",
    specs: [
      { label: "Display", value: '13.4" 2.8K OLED' },
      { label: "Memory", value: "16 GB unified" },
      { label: "Storage", value: "512 GB SSD" },
    ],
    popularity: 84,
    createdAt: "2026-04-21",
  },
  {
    id: "orbit-smart-speaker",
    name: "Orbit Smart Speaker",
    brand: "Nordwave",
    category: "electronics",
    price: 129,
    originalPrice: 179,
    rating: 4.4,
    reviews: 621,
    images: [img("photo-1541643600914-78b084683601"), img("photo-1608043152269-423dbba4e7e1")],
    description:
      "Room-filling 360° sound with automatic tuning that adapts to where you place it.",
    specs: [
      { label: "Output", value: "60 W RMS" },
      { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.3" },
    ],
    popularity: 72,
    createdAt: "2026-03-09",
  },
  {
    id: "frame-mirrorless-camera",
    name: "Frame M200 Mirrorless Camera",
    brand: "Kestrel",
    category: "electronics",
    price: 949,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 288,
    badge: "Limited",
    images: [img("photo-1526170375885-4d8ecf77b99f"), img("photo-1502920917128-1aa500764cbd")],
    description:
      "24 MP back-illuminated sensor, in-body stabilisation and dual card slots in a body you can carry all day.",
    specs: [
      { label: "Sensor", value: "24.2 MP APS-C" },
      { label: "Video", value: "4K60 10-bit" },
      { label: "Stabilisation", value: "5-axis IBIS" },
    ],
    popularity: 79,
    createdAt: "2026-06-20",
  },
  {
    id: "linen-oversized-shirt",
    name: "Washed Linen Oversized Shirt",
    brand: "Atlas & Oak",
    category: "fashion",
    price: 64,
    originalPrice: 98,
    rating: 4.5,
    reviews: 502,
    images: [img("photo-1521572163474-6864f9cf17ab"), img("photo-1596755094514-f87e34085b2c")],
    colors: ["Ecru", "Olive", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "European linen, garment-washed for softness, with a relaxed shoulder and mother-of-pearl buttons.",
    specs: [
      { label: "Fabric", value: "100% French linen" },
      { label: "Fit", value: "Relaxed" },
      { label: "Care", value: "Machine wash cold" },
    ],
    popularity: 88,
    createdAt: "2026-05-30",
  },
  {
    id: "structured-wool-coat",
    name: "Structured Wool Overcoat",
    brand: "Atlas & Oak",
    category: "fashion",
    price: 249,
    originalPrice: 380,
    rating: 4.7,
    reviews: 214,
    badge: "New",
    images: [img("photo-1539109136881-3be0616acf4b"), img("photo-1483985988355-763728e1935b")],
    colors: ["Camel", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "A double-faced wool blend coat with a clean lapel and a length that works over knitwear or tailoring.",
    specs: [
      { label: "Fabric", value: "80% wool, 20% recycled poly" },
      { label: "Lining", value: "Cupro" },
    ],
    popularity: 74,
    createdAt: "2026-07-01",
  },
  {
    id: "everyday-cotton-tee",
    name: "Heavyweight Everyday Tee",
    brand: "Atlas & Oak",
    category: "fashion",
    price: 28,
    originalPrice: 42,
    rating: 4.3,
    reviews: 1580,
    images: [img("photo-1503341504253-dff4815485f1"), img("photo-1512436991641-6745cdb1723f")],
    colors: ["White", "Black", "Sage"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "240 gsm combed cotton with a boxy body that holds its shape after washing.",
    specs: [
      { label: "Weight", value: "240 gsm" },
      { label: "Fabric", value: "Organic cotton" },
    ],
    popularity: 95,
    createdAt: "2026-02-11",
  },
  {
    id: "denim-tapered-jeans",
    name: "Tapered Selvedge Jeans",
    brand: "Northbound",
    category: "fashion",
    price: 118,
    originalPrice: 160,
    rating: 4.6,
    reviews: 389,
    images: [img("photo-1542272604-787c3835535d"), img("photo-1541099649105-f69ad21f3246")],
    colors: ["Indigo", "Washed Black"],
    sizes: ["28", "30", "32", "34", "36"],
    description: "13.5 oz Japanese selvedge denim with a mid rise and a clean taper to the ankle.",
    specs: [
      { label: "Denim", value: "13.5 oz selvedge" },
      { label: "Rise", value: "Mid" },
    ],
    popularity: 70,
    createdAt: "2026-01-28",
  },
  {
    id: "trail-runner-gt",
    name: "Trail Runner GT",
    brand: "Stride Lab",
    category: "shoes",
    price: 132,
    originalPrice: 185,
    rating: 4.7,
    reviews: 764,
    badge: "Bestseller",
    images: [img("photo-1542291026-7eec264c27ff"), img("photo-1600185365483-26d7a4cc7519")],
    colors: ["Crimson", "Storm", "Bone"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    description:
      "Grippy 4 mm lugs, a rock plate underfoot and a breathable mesh upper for mixed terrain.",
    specs: [
      { label: "Drop", value: "6 mm" },
      { label: "Weight", value: "272 g (US 9)" },
      { label: "Outsole", value: "Rubber, 4 mm lugs" },
    ],
    popularity: 93,
    createdAt: "2026-06-08",
  },
  {
    id: "court-classic-sneaker",
    name: "Court Classic Leather Sneaker",
    brand: "Stride Lab",
    category: "shoes",
    price: 96,
    originalPrice: 140,
    rating: 4.4,
    reviews: 612,
    images: [img("photo-1560769629-975ec94e6a86"), img("photo-1607522370275-f14206abe5d3")],
    colors: ["White", "Cream", "Black"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    description: "Full-grain leather upper on a vulcanised sole — a plain sneaker done properly.",
    specs: [
      { label: "Upper", value: "Full-grain leather" },
      { label: "Sole", value: "Vulcanised rubber" },
    ],
    popularity: 81,
    createdAt: "2026-03-22",
  },
  {
    id: "cloud-step-runner",
    name: "Cloud Step Daily Runner",
    brand: "Stride Lab",
    category: "shoes",
    price: 118,
    originalPrice: 149,
    rating: 4.5,
    reviews: 431,
    images: [img("photo-1610945415295-d9bbf067e59c"), img("photo-1595950653106-6c9ebd614d3a")],
    colors: ["Sky", "Graphite"],
    sizes: ["7", "8", "9", "10", "11"],
    description: "A soft supercritical foam midsole for easy miles and long days on your feet.",
    specs: [
      { label: "Drop", value: "8 mm" },
      { label: "Use", value: "Daily training" },
    ],
    popularity: 76,
    createdAt: "2026-05-02",
  },
  {
    id: "heritage-automatic-38",
    name: "Heritage Automatic 38",
    brand: "Calder",
    category: "watches",
    price: 429,
    originalPrice: 620,
    rating: 4.8,
    reviews: 197,
    badge: "Limited",
    images: [img("photo-1523275335684-37898b6baf30"), img("photo-1524592094714-0f0654e20314")],
    colors: ["Silver / Brown", "Gold / Black"],
    description:
      "A 38 mm stainless case, sapphire crystal and a 41-hour automatic movement on an Italian leather strap.",
    specs: [
      { label: "Movement", value: "Automatic, 41h reserve" },
      { label: "Case", value: "38 mm stainless steel" },
      { label: "Water resistance", value: "10 ATM" },
    ],
    popularity: 86,
    createdAt: "2026-04-04",
  },
  {
    id: "vitals-smartwatch-2",
    name: "Vitals Smartwatch 2",
    brand: "Nordwave",
    category: "watches",
    price: 219,
    originalPrice: 299,
    rating: 4.5,
    reviews: 918,
    badge: "New",
    images: [img("photo-1546868871-7041f2a55e12"), img("photo-1508685096489-7aacd43bd3b1")],
    colors: ["Black", "Rose"],
    sizes: ["41 mm", "45 mm"],
    description:
      "Continuous heart rate, sleep staging and dual-band GPS with a 9-day battery in everyday use.",
    specs: [
      { label: "Display", value: "1.4\" AMOLED" },
      { label: "Battery", value: "9 days typical" },
      { label: "GPS", value: "Dual-band" },
    ],
    popularity: 90,
    createdAt: "2026-06-27",
  },
  {
    id: "minimal-mesh-watch",
    name: "Minimal Mesh Quartz Watch",
    brand: "Calder",
    category: "watches",
    price: 139,
    originalPrice: 199,
    rating: 4.2,
    reviews: 264,
    images: [img("photo-1533139502658-0198f920d8e8"), img("photo-1509048191080-d2984bad6ae5")],
    colors: ["Steel", "Gold"],
    description: "A slim 6.8 mm case on a mesh bracelet — quiet enough for every wrist.",
    specs: [
      { label: "Movement", value: "Swiss quartz" },
      { label: "Thickness", value: "6.8 mm" },
    ],
    popularity: 64,
    createdAt: "2026-02-19",
  },
  {
    id: "glow-serum-set",
    name: "Glow Vitamin C Serum Set",
    brand: "Fleur Studio",
    category: "beauty",
    price: 58,
    originalPrice: 92,
    rating: 4.6,
    reviews: 1104,
    badge: "Bestseller",
    images: [img("photo-1596462502278-27bfdc403348"), img("photo-1571781926291-c477ebfd024b")],
    description:
      "A 12% vitamin C serum paired with a ceramide moisturiser for brighter, calmer skin in four weeks.",
    specs: [
      { label: "Volume", value: "30 ml + 50 ml" },
      { label: "Free from", value: "Fragrance, alcohol" },
    ],
    popularity: 89,
    createdAt: "2026-05-19",
  },
  {
    id: "amber-eau-de-parfum",
    name: "Amber Noir Eau de Parfum",
    brand: "Fleur Studio",
    category: "beauty",
    price: 88,
    originalPrice: 130,
    rating: 4.7,
    reviews: 356,
    images: [img("photo-1585386959984-a4155224a1ad"), img("photo-1541643600914-78b084683601")],
    sizes: ["50 ml", "100 ml"],
    description: "Warm amber, black pepper and cedar with an eight-hour wear on skin.",
    specs: [
      { label: "Family", value: "Amber woody" },
      { label: "Concentration", value: "18% parfum" },
    ],
    popularity: 78,
    createdAt: "2026-03-30",
  },
  {
    id: "silk-hair-oil",
    name: "Silk Repair Hair Oil",
    brand: "Fleur Studio",
    category: "beauty",
    price: 34,
    originalPrice: 48,
    rating: 4.3,
    reviews: 487,
    images: [img("photo-1608248543803-ba4f8c70ae0b"), img("photo-1522335789203-aabd1fc54bc9")],
    description: "A lightweight blend of squalane and camellia oil that smooths without weight.",
    specs: [
      { label: "Volume", value: "100 ml" },
      { label: "Suitable for", value: "All hair types" },
    ],
    popularity: 66,
    createdAt: "2026-01-16",
  },
  {
    id: "stoneware-dinner-set",
    name: "Stoneware Dinner Set, 12 Piece",
    brand: "Hearth Co.",
    category: "home-kitchen",
    price: 128,
    originalPrice: 189,
    rating: 4.6,
    reviews: 342,
    images: [img("photo-1594223274512-ad4803739b7c"), img("photo-1578985545062-69928b1d9587")],
    colors: ["Chalk", "Clay"],
    description: "Reactive-glaze stoneware, dishwasher and oven safe, with a satisfying weight.",
    specs: [
      { label: "Includes", value: "4 plates, 4 bowls, 4 mugs" },
      { label: "Material", value: "Glazed stoneware" },
    ],
    popularity: 75,
    createdAt: "2026-04-12",
  },
  {
    id: "linen-lounge-sofa",
    name: "Marlow Linen Two-Seat Sofa",
    brand: "Hearth Co.",
    category: "home-kitchen",
    price: 899,
    originalPrice: 1290,
    rating: 4.5,
    reviews: 121,
    badge: "Limited",
    images: [img("photo-1556909212-d5b604d0c90d"), img("photo-1493666438817-866a91353ca9")],
    colors: ["Oat", "Moss"],
    description: "A kiln-dried hardwood frame, feather-blend cushions and a removable linen cover.",
    specs: [
      { label: "Dimensions", value: "182 × 88 × 78 cm" },
      { label: "Frame", value: "Kiln-dried hardwood" },
    ],
    popularity: 61,
    createdAt: "2026-02-02",
  },
  {
    id: "pour-over-kettle",
    name: "Precision Pour-Over Kettle",
    brand: "Hearth Co.",
    category: "home-kitchen",
    price: 96,
    originalPrice: 139,
    rating: 4.8,
    reviews: 528,
    badge: "Hot",
    images: [img("photo-1517080945644-0ae6f9b78b91"), img("photo-1495474472287-4d71bcdd2085")],
    description: "Variable temperature to the degree, a gooseneck spout and a 60-minute hold.",
    specs: [
      { label: "Capacity", value: "0.9 L" },
      { label: "Range", value: "40–100 °C" },
    ],
    popularity: 83,
    createdAt: "2026-05-25",
  },
  {
    id: "leather-weekender",
    name: "Leather Weekender Bag",
    brand: "Northbound",
    category: "accessories",
    price: 219,
    originalPrice: 320,
    rating: 4.7,
    reviews: 233,
    images: [img("photo-1553062407-98eeb64c6a62"), img("photo-1547949003-9792a18a2601")],
    colors: ["Tan", "Black"],
    description: "Full-grain vegetable-tanned leather with a cotton twill lining and brass hardware.",
    specs: [
      { label: "Capacity", value: "38 L" },
      { label: "Leather", value: "Full-grain, veg-tanned" },
    ],
    popularity: 77,
    createdAt: "2026-03-15",
  },
  {
    id: "acetate-sunglasses",
    name: "Acetate Keyhole Sunglasses",
    brand: "Calder",
    category: "accessories",
    price: 74,
    originalPrice: 115,
    rating: 4.4,
    reviews: 398,
    images: [img("photo-1511499767150-a48a237f0083"), img("photo-1572635196237-14b3f281503f")],
    colors: ["Tortoise", "Black", "Crystal"],
    description: "Hand-polished Italian acetate with polarised CR-39 lenses and steel core temples.",
    specs: [
      { label: "Lens", value: "Polarised, UV400" },
      { label: "Frame", value: "Italian acetate" },
    ],
    popularity: 71,
    createdAt: "2026-04-27",
  },
  {
    id: "canvas-daypack",
    name: "Canvas Commuter Daypack",
    brand: "Northbound",
    category: "accessories",
    price: 88,
    originalPrice: 125,
    rating: 4.5,
    reviews: 456,
    images: [img("photo-1622560480605-d83c853bc5c3"), img("photo-1491637639811-60e2756cc1c7")],
    colors: ["Charcoal", "Sand"],
    description: "Waxed canvas, a padded 16\" laptop sleeve and a roll top that expands 6 litres.",
    specs: [
      { label: "Capacity", value: "20–26 L" },
      { label: "Laptop", value: "Fits 16\"" },
    ],
    popularity: 80,
    createdAt: "2026-06-14",
  },
  {
    id: "hex-dumbbell-pair",
    name: "Rubber Hex Dumbbell Pair",
    brand: "Ironline",
    category: "fitness",
    price: 79,
    originalPrice: 119,
    rating: 4.6,
    reviews: 611,
    images: [img("photo-1584735935682-2f2b69dff9d2"), img("photo-1571019613454-1cb2f99b2d8b")],
    sizes: ["5 kg", "10 kg", "15 kg", "20 kg"],
    description: "Rubber-encased heads that won't roll or mark the floor, with a knurled chrome handle.",
    specs: [
      { label: "Material", value: "Rubber-coated cast iron" },
      { label: "Handle", value: "Knurled chrome" },
    ],
    popularity: 82,
    createdAt: "2026-05-06",
  },
  {
    id: "grip-yoga-mat",
    name: "Natural Grip Yoga Mat",
    brand: "Ironline",
    category: "fitness",
    price: 68,
    originalPrice: 95,
    rating: 4.7,
    reviews: 742,
    badge: "Bestseller",
    images: [img("photo-1592432678016-e910b452f9a2"), img("photo-1518611012118-696072aa579a")],
    colors: ["Terracotta", "Slate"],
    description: "Natural rubber base with a cork top that grips better the more you sweat.",
    specs: [
      { label: "Thickness", value: "5 mm" },
      { label: "Size", value: "183 × 66 cm" },
    ],
    popularity: 87,
    createdAt: "2026-04-18",
  },
  {
    id: "smart-jump-rope",
    name: "Smart Weighted Jump Rope",
    brand: "Ironline",
    category: "fitness",
    price: 42,
    originalPrice: 65,
    rating: 4.1,
    reviews: 289,
    images: [img("photo-1517963879433-6ad2b056d712"), img("photo-1534438327276-14e5300c3a48")],
    description: "Counts jumps and calories on-handle, with swappable 250 g weighted cartridges.",
    specs: [
      { label: "Cable", value: "Steel core, 3 m" },
      { label: "Battery", value: "30 days" },
    ],
    popularity: 58,
    createdAt: "2026-01-09",
  },
  {
    id: "merino-crew-knit",
    name: "Merino Crew Neck Knit",
    brand: "Atlas & Oak",
    category: "fashion",
    price: 108,
    originalPrice: 150,
    rating: 4.6,
    reviews: 327,
    images: [img("photo-1576871337622-98d48d1cf531"), img("photo-1620799140408-edc6dcb6d633")],
    colors: ["Fog", "Rust", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    description: "Extra-fine 19.5 micron merino, fully fashioned so the seams sit flat.",
    specs: [
      { label: "Fabric", value: "100% extra-fine merino" },
      { label: "Gauge", value: "12 gg" },
    ],
    popularity: 73,
    createdAt: "2026-03-03",
  },
];

export const products: Product[] = seeds.map((p) => ({
  ...p,
  keywords: [p.name, p.brand, categoryName(p.category), p.category, p.badge ?? ""]
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean),
}));

export const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

export const discountPercent = (p: Product) =>
  Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const byCategory = (slug: string) => products.filter((p) => p.category === slug);

export const relatedProducts = (p: Product, limit = 4) =>
  products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, limit);

export const deals = products
  .slice()
  .sort((a, b) => discountPercent(b) - discountPercent(a))
  .slice(0, 12);

export const trending = products.slice().sort((a, b) => b.popularity - a.popularity).slice(0, 8);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })
    .format(value);

export const searchProducts = (list: Product[], query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const terms = q.split(/\s+/);
  return list.filter((p) => {
    const hay = `${p.name} ${p.brand} ${categoryName(p.category)} ${p.description} ${p.keywords.join(" ")}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
};

export const testimonials = [
  {
    name: "Amara Okafor",
    role: "Photographer, Lagos",
    rating: 5,
    text: "The Frame M200 arrived in two days and the packaging was flawless. Returns policy made it an easy decision.",
    avatar: img("photo-1494790108377-be9c29b29330"),
  },
  {
    name: "Daniel Reyes",
    role: "Marathon runner, Austin",
    rating: 5,
    text: "Third pair of Trail Runners from CHERRY SHOP. Sizing guidance is accurate, which almost never happens online.",
    avatar: img("photo-1500648767791-00dcc994a43e"),
  },
  {
    name: "Sofia Lindqvist",
    role: "Interior stylist, Malmö",
    rating: 4,
    text: "The stoneware set photographs beautifully and has survived six months of daily dishwasher runs.",
    avatar: img("photo-1534528741775-53994a69daeb"),
  },
];
