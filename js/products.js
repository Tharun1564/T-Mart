const productData = [
  { id: 1, name: 'Aurora Headphones', category: 'Audio', price: 149, discount: 15, rating: 4.8, reviews: 324, stock: 'In Stock', brand: 'Lumen', description: 'Immersive sound with premium comfort and ANC.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: true },
  { id: 2, name: 'Nimbus Smartwatch', category: 'Wearables', price: 199, discount: 12, rating: 4.7, reviews: 218, stock: 'In Stock', brand: 'Chrono', description: 'Sleek wearable with fitness tracking and all-day battery.', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: true },
  { id: 3, name: 'Velora Backpack', category: 'Accessories', price: 89, discount: 10, rating: 4.6, reviews: 190, stock: 'Low Stock', brand: 'Pace', description: 'Minimal, durable, and built for daily movement.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 4, name: 'Aero Chair', category: 'Furniture', price: 279, discount: 20, rating: 4.9, reviews: 462, stock: 'In Stock', brand: 'North', description: 'Ergonomic lounge chair with sculpted comfort.', image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: true },
  { id: 5, name: 'Luna Lamp', category: 'Home', price: 119, discount: 8, rating: 4.5, reviews: 128, stock: 'In Stock', brand: 'Mira', description: 'Soft ambient lighting with a sculptural silhouette.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 6, name: 'Nova Sneakers', category: 'Fashion', price: 129, discount: 25, rating: 4.8, reviews: 312, stock: 'In Stock', brand: 'Stride', description: 'Comfort-forward sneakers built for all-day wear.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: true },
  { id: 7, name: 'Crest Bottle', category: 'Wellness', price: 49, discount: 5, rating: 4.4, reviews: 98, stock: 'In Stock', brand: 'Hydra', description: 'Thermal bottle engineered for mobility and style.', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 8, name: 'Halo Keyboard', category: 'Tech', price: 159, discount: 18, rating: 4.9, reviews: 276, stock: 'In Stock', brand: 'Pixel', description: 'Low-profile keyboard with tactile precision.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: true },
  { id: 9, name: 'Motive Mug', category: 'Home', price: 24, discount: 10, rating: 4.3, reviews: 82, stock: 'In Stock', brand: 'Mira', description: 'Ceramic mug with a soft matte finish.', image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 10, name: 'Vanta Camera', category: 'Tech', price: 349, discount: 30, rating: 4.9, reviews: 512, stock: 'In Stock', brand: 'Lumen', description: 'Compact camera with studio-grade image quality.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: true },
  { id: 11, name: 'Sora Tote', category: 'Accessories', price: 74, discount: 12, rating: 4.6, reviews: 145, stock: 'In Stock', brand: 'Pace', description: 'Structured tote made for premium daily carry.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 12, name: 'Peak Jar', category: 'Wellness', price: 38, discount: 6, rating: 4.2, reviews: 74, stock: 'Low Stock', brand: 'Hydra', description: 'Luxury skincare essentials arranged beautifully.', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 13, name: 'Echo Speaker', category: 'Audio', price: 179, discount: 14, rating: 4.8, reviews: 289, stock: 'In Stock', brand: 'Pixel', description: 'Rich audio with a compact, modern form factor.', image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: true },
  { id: 14, name: 'Orbit Glasses', category: 'Fashion', price: 99, discount: 15, rating: 4.7, reviews: 163, stock: 'In Stock', brand: 'Stride', description: 'Refined eyewear with bold minimalist lines.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 15, name: 'Cove Sofa', category: 'Furniture', price: 899, discount: 22, rating: 4.9, reviews: 311, stock: 'In Stock', brand: 'North', description: 'Soft modular seating designed for luxury interiors.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: true },
  { id: 16, name: 'Flare Hoodie', category: 'Fashion', price: 84, discount: 10, rating: 4.5, reviews: 134, stock: 'In Stock', brand: 'Stride', description: 'Layered comfort with polished everyday style.', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 17, name: 'Solstice Watch', category: 'Wearables', price: 229, discount: 16, rating: 4.8, reviews: 244, stock: 'In Stock', brand: 'Chrono', description: 'Luxury timepiece with timeless design.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: true },
  { id: 18, name: 'Pine Table', category: 'Furniture', price: 399, discount: 18, rating: 4.7, reviews: 201, stock: 'In Stock', brand: 'North', description: 'Clean-lined centerpiece for modern spaces.', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 19, name: 'Aurelia Perfume', category: 'Wellness', price: 69, discount: 9, rating: 4.6, reviews: 111, stock: 'In Stock', brand: 'Hydra', description: 'A signature scent with fresh citrus and woods.', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 20, name: 'Air Pro Earbuds', category: 'Audio', price: 129, discount: 13, rating: 4.9, reviews: 382, stock: 'In Stock', brand: 'Lumen', description: 'Compact earbuds with immersive sound and secure fit.', image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: true },
  { id: 21, name: 'Luma Caddy', category: 'Accessories', price: 54, discount: 7, rating: 4.3, reviews: 67, stock: 'In Stock', brand: 'Pace', description: 'A refined organizer for everyday essentials.', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 22, name: 'Ridge Tote', category: 'Fashion', price: 114, discount: 11, rating: 4.4, reviews: 121, stock: 'Low Stock', brand: 'Stride', description: 'Luxury carryall finished with premium texture.', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 23, name: 'Sage Oil', category: 'Wellness', price: 45, discount: 6, rating: 4.7, reviews: 106, stock: 'In Stock', brand: 'Hydra', description: 'Elevated aromatherapy for calm and focus.', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 24, name: 'Flux Laptop Stand', category: 'Tech', price: 79, discount: 12, rating: 4.6, reviews: 101, stock: 'In Stock', brand: 'Pixel', description: 'Sleek stand with better posture and neat cable routing.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 25, name: 'Marlow Dresser', category: 'Furniture', price: 689, discount: 19, rating: 4.8, reviews: 241, stock: 'In Stock', brand: 'North', description: 'A refined storage piece made for a polished home.', image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: true },
  { id: 26, name: 'Pico Charger', category: 'Tech', price: 59, discount: 8, rating: 4.5, reviews: 94, stock: 'In Stock', brand: 'Pixel', description: 'Compact charger with superior power delivery.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 27, name: 'Etta Scarf', category: 'Fashion', price: 64, discount: 14, rating: 4.6, reviews: 113, stock: 'In Stock', brand: 'Stride', description: 'Soft drape and versatile styling for every season.', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 28, name: 'Aster Cushion', category: 'Home', price: 54, discount: 10, rating: 4.4, reviews: 79, stock: 'In Stock', brand: 'Mira', description: 'Texture-rich cushion for warm and layered interiors.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 29, name: 'Woven Basket', category: 'Home', price: 72, discount: 9, rating: 4.3, reviews: 88, stock: 'In Stock', brand: 'Mira', description: 'Storage basket with handcrafted texture and polish.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 30, name: 'Revolve Roller', category: 'Wellness', price: 39, discount: 7, rating: 4.5, reviews: 92, stock: 'In Stock', brand: 'Hydra', description: 'A compact wellness essential for restorative routines.', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 31, name: 'Motive Case', category: 'Accessories', price: 48, discount: 8, rating: 4.4, reviews: 69, stock: 'In Stock', brand: 'Pace', description: 'Slim protective case with a premium premium finish.', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 32, name: 'Velvet Rug', category: 'Furniture', price: 289, discount: 15, rating: 4.8, reviews: 224, stock: 'In Stock', brand: 'North', description: 'Soft woven rug for elevated comfort and contrast.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: true },
  { id: 33, name: 'Monarch Plate', category: 'Home', price: 32, discount: 6, rating: 4.2, reviews: 55, stock: 'Low Stock', brand: 'Mira', description: 'Fine ceramic plate with refined detailing.', image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 34, name: 'Pulse Ring', category: 'Accessories', price: 94, discount: 10, rating: 4.6, reviews: 111, stock: 'In Stock', brand: 'Pace', description: 'Stylish everyday ring designed with clean geometry.', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 35, name: 'Nexa Tablet', category: 'Tech', price: 499, discount: 18, rating: 4.9, reviews: 237, stock: 'In Stock', brand: 'Lumen', description: 'High-performance tablet with crisp display and portability.', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: true },
  { id: 36, name: 'Vista Frame', category: 'Home', price: 44, discount: 8, rating: 4.4, reviews: 63, stock: 'In Stock', brand: 'Mira', description: 'Design-forward frame for galleries and modern walls.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 37, name: 'Breeze Blender', category: 'Wellness', price: 99, discount: 12, rating: 4.7, reviews: 122, stock: 'In Stock', brand: 'Hydra', description: 'Powerful blender for healthy routines and smoothies.', image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: true },
  { id: 38, name: 'Tone Speaker', category: 'Audio', price: 124, discount: 11, rating: 4.5, reviews: 88, stock: 'In Stock', brand: 'Pixel', description: 'Portable speaker with rich bass and elegant finish.', image: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 39, name: 'Satin Jacket', category: 'Fashion', price: 139, discount: 16, rating: 4.8, reviews: 174, stock: 'In Stock', brand: 'Stride', description: 'Soft outerwear with polished tailoring and comfort.', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: true },
  { id: 40, name: 'Cedar Desk', category: 'Furniture', price: 649, discount: 17, rating: 4.9, reviews: 255, stock: 'In Stock', brand: 'North', description: 'A premium desk built for focused work and calm style.', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: true },
  { id: 41, name: 'Aero Mask', category: 'Wellness', price: 29, discount: 5, rating: 4.3, reviews: 54, stock: 'In Stock', brand: 'Hydra', description: 'Lightweight mask for daily comfort and movement.', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 42, name: 'Glint Wallet', category: 'Accessories', price: 61, discount: 9, rating: 4.5, reviews: 91, stock: 'In Stock', brand: 'Pace', description: 'Minimal wallet with precise storage compartments.', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 43, name: 'Luma Sneakers', category: 'Fashion', price: 119, discount: 13, rating: 4.7, reviews: 154, stock: 'In Stock', brand: 'Stride', description: 'Easy movement paired with elevated design.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 44, name: 'Orbit Mouse', category: 'Tech', price: 69, discount: 10, rating: 4.6, reviews: 118, stock: 'In Stock', brand: 'Pixel', description: 'Comfortable wireless mouse built for precision.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 45, name: 'Nori Candle', category: 'Home', price: 42, discount: 8, rating: 4.5, reviews: 71, stock: 'In Stock', brand: 'Mira', description: 'Clean fragrance for modern interiors and rituals.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 46, name: 'Pure Case', category: 'Accessories', price: 36, discount: 7, rating: 4.3, reviews: 66, stock: 'Low Stock', brand: 'Pace', description: 'Protective device case with a soft matte finish.', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: false },
  { id: 47, name: 'Tidal Bottle', category: 'Wellness', price: 55, discount: 10, rating: 4.6, reviews: 98, stock: 'In Stock', brand: 'Hydra', description: 'Elegant tumbler with insulated performance.', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 48, name: 'Crest Laptop', category: 'Tech', price: 899, discount: 20, rating: 4.9, reviews: 301, stock: 'In Stock', brand: 'Lumen', description: 'Powerful laptop with slim silhouette and premium finish.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', isNew: false, bestseller: true },
  { id: 49, name: 'Cove Rug', category: 'Furniture', price: 229, discount: 12, rating: 4.7, reviews: 149, stock: 'In Stock', brand: 'North', description: 'Textured rug with warm tones and refined comfort.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false },
  { id: 50, name: 'Eden Hoodie', category: 'Fashion', price: 94, discount: 11, rating: 4.6, reviews: 128, stock: 'In Stock', brand: 'Stride', description: 'Elevated loungewear with approachable luxury.', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', isNew: true, bestseller: false }
];

const ProductService = {
  getAll() {
    return productData;
  },
  getById(id) {
    return productData.find((p) => p.id === Number(id));
  },
  getFeatured(count = 8) {
    return productData.slice(0, count);
  },
  getTrending(count = 8) {
    return productData.filter((p) => p.bestseller).slice(0, count);
  },
  getNewArrivals(count = 8) {
    return productData.filter((p) => p.isNew).slice(0, count);
  },
  getCategories() {
    return [...new Set(productData.map((p) => p.category))];
  },
  getBrands() {
    return [...new Set(productData.map((p) => p.brand))];
  },
  filterProducts(filters = {}) {
    let items = [...productData];
    if (filters.query) {
      const q = filters.query.toLowerCase();
      items = items.filter((p) => `${p.name} ${p.category} ${p.brand}`.toLowerCase().includes(q));
    }
    if (filters.category && filters.category !== 'all') items = items.filter((p) => p.category === filters.category);
    if (filters.brand && filters.brand !== 'all') items = items.filter((p) => p.brand === filters.brand);
    if (filters.price) items = items.filter((p) => p.price <= Number(filters.price));
    if (filters.rating) items = items.filter((p) => p.rating >= Number(filters.rating));
    if (filters.discount) items = items.filter((p) => p.discount >= Number(filters.discount));
    if (filters.availability && filters.availability !== 'all') {
      items = items.filter((p) => (filters.availability === 'in-stock' ? p.stock === 'In Stock' : p.stock === 'Low Stock'));
    }
    if (filters.sort === 'price-asc') items.sort((a, b) => a.price - b.price);
    if (filters.sort === 'price-desc') items.sort((a, b) => b.price - a.price);
    if (filters.sort === 'rating') items.sort((a, b) => b.rating - a.rating);
    if (filters.sort === 'newest') items.sort((a, b) => b.id - a.id);
    if (filters.sort === 'best-selling') items.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
    return items;
  }
};
