# Cherry Shop Bloom

Build CHERRY SHOP, a modern, production-grade e-commerce web application with a clean, premium light design and professional accents.

Core Features & Pages:
1. Header: Sticky navigation with logo (CHERRY SHOP), links (Home, Shop, Categories, Deals, About, Contact), interactive search bar, wishlist badge counter, cart badge counter, user account menu, and responsive mobile drawer menu.
2. Homepage:
   - Hero banner: "SHOP SMART. LIVE BETTER." with subtitle "Discover quality products at prices you'll love.", CTA buttons ("Shop Now", "Explore Deals"), and modern imagery.
   - Featured category cards with images and hover states (Electronics, Fashion, Shoes, Watches, Beauty, Home & Kitchen, Accessories, Fitness).
   - Trending products grid (8 products with badges, ratings, prices, discount %, Add to Cart, and Wishlist toggles).
   - Promotional offer banner ("UP TO 50% OFF" with "Shop Deals" CTA).
   - "Why Choose Us" section (Secure Payments, Fast Delivery, Easy Returns, 24/7 Support).
   - Customer testimonial reviews with ratings and avatars.
   - Newsletter signup form with toast notification.
3. Shop / Catalog Page:
   - Full product listing with responsive grid and pagination / load more.
   - Search by product name, category, brand, and keywords with empty state fallback.
   - Filters: Category, price range slider, star rating, brand, discount.
   - Sorting: Popularity, Price Low to High, Price High to Low, Rating, Newest.
4. Product Details Page:
   - Image gallery with thumbnails and main zoom/preview.
   - Product name, brand, ratings, reviews count, current & original price, discount tag.
   - Color picker and size selector where applicable, quantity controls.
   - Add to Cart, Buy Now (direct to checkout), and Wishlist buttons.
   - Tabs/sections for specifications, shipping info, return policy, customer reviews, and related products.
5. Cart & Wishlist:
   - Full cart view with line items, quantity increment/decrement, remove item, subtotal, discount, shipping, tax, and order total calculation.
   - Dedicated wishlist page with ability to remove items and move items to cart.
   - Persist cart and wishlist state via LocalStorage.
6. Multi-Step Checkout & Confirmation:
   - Step 1: Customer details (Name, email, phone).
   - Step 2: Shipping address.
   - Step 3: Payment method UI (Credit/Debit Card, UPI, Cash on Delivery).
   - Step 4: Order review and "Place Order" button.
   - Beautiful Order Confirmation page displaying simulated Order ID, order date, items summary, delivery address, estimated delivery, and actions.
7. User Account Dashboard:
   - Simulated profile, order history, wishlist view, saved addresses, and settings with LocalStorage mock auth.
8. Deals & Categories:
   - Dedicated deals page with countdown timers, discount badges, and sale prices.
   - Dedicated category pages with banners, descriptions, and filtered products.
9. Footer:
   - Brand info, quick links, policies, social links, and accepted payment badge icons.
10. Data & Polish:
    - Pre-load at least 24 realistic products with high-quality images across categories.
    - Smooth transitions, loading states, empty states, and toast notifications for all actions.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8d127f39-18a1-4834-a767-8fbc9394ea42).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
