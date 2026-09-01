export const CATEGORIES = ['Electronics', 'Fashion', 'Home & Living', 'Sports']

const image = (photoId) => `https://images.unsplash.com/photo-${photoId}?w=800&h=800&fit=crop&auto=format&q=80`

export const PRODUCTS = [
  { id: 'elec-1', name: 'Wireless Over-Ear Headphones', price: 89.99, compareAtPrice: 109.99, category: 'Electronics', image: image('1505740420928-5e560c06d30e'), description: 'Noise-isolating wireless headphones with 30-hour battery life and plush ear cushions for all-day comfort.', stock: 24, rating: 4.7, reviewCount: 312 },
  { id: 'elec-2', name: 'Smart Fitness Watch', price: 129.0, category: 'Electronics', image: image('1434493789847-2f02dc6ca35d'), description: 'Track heart rate, sleep, and workouts with a bright always-on display and 7-day battery.', stock: 15, rating: 4.5, reviewCount: 189 },
  { id: 'elec-3', name: 'Portable Bluetooth Speaker', price: 49.5, category: 'Electronics', image: image('1608043152269-423dbba4e7e1'), description: 'Compact speaker with rich bass, IPX6 water resistance, and 12-hour playtime.', stock: 40, rating: 4.6, reviewCount: 245 },
  { id: 'elec-4', name: 'Mechanical Keyboard', price: 74.0, category: 'Electronics', image: image('1595044426077-d36d9236d54a'), description: 'Tactile mechanical switches with per-key RGB lighting and a durable aluminum frame.', stock: 18, rating: 4.8, reviewCount: 156, isNew: true },
  { id: 'elec-5', name: 'USB-C Fast Charger, 65W', price: 29.99, category: 'Electronics', image: image('1706290134049-c5c72d24146a'), description: 'Compact GaN charger that fuels a laptop and phone at the same time.', stock: 60, rating: 4.4, reviewCount: 98 },
  { id: 'fashion-1', name: 'Classic Denim Jacket', price: 64.0, category: 'Fashion', image: image('1543076447-215ad9ba6923'), description: 'Timeless denim jacket with a relaxed fit, built from heavyweight cotton.', stock: 22, rating: 4.3, reviewCount: 87 },
  { id: 'fashion-2', name: 'Everyday Canvas Sneakers', price: 55.0, category: 'Fashion', image: image('1641997465126-c73cc4070337'), description: 'Lightweight canvas sneakers with a cushioned sole, made for daily wear.', stock: 30, rating: 4.6, reviewCount: 203, isNew: true },
  { id: 'fashion-3', name: 'Merino Wool Sweater', price: 78.5, compareAtPrice: 98.5, category: 'Fashion', image: image('1597954222003-0ce9cfa08494'), description: 'Soft, breathable merino wool sweater that keeps you warm without the bulk.', stock: 12, rating: 4.7, reviewCount: 134 },
  { id: 'fashion-4', name: 'Minimalist Leather Wallet', price: 34.0, category: 'Fashion', image: image('1601592996763-f05c9c80a7f1'), description: 'Slim bifold wallet in full-grain leather with six card slots.', stock: 45, rating: 4.5, reviewCount: 176 },
  { id: 'home-1', name: 'Ceramic Pour-Over Coffee Set', price: 42.0, category: 'Home & Living', image: image('1637944220531-5f6fd15c1e29'), description: 'Hand-glazed ceramic dripper and carafe for a smoother, richer cup.', stock: 20, rating: 4.6, reviewCount: 92 },
  { id: 'home-2', name: 'Linen Throw Blanket', price: 38.0, category: 'Home & Living', image: image('1634665810235-011d663754e7'), description: 'Pre-washed linen blanket that softens with every wash, perfect for any season.', stock: 27, rating: 4.4, reviewCount: 65 },
  { id: 'home-3', name: 'Aroma Diffuser & Humidifier', price: 45.99, compareAtPrice: 59.99, category: 'Home & Living', image: image('1674600625818-94530dc168b6'), description: 'Whisper-quiet ultrasonic diffuser with color-changing ambient light.', stock: 33, rating: 4.2, reviewCount: 121 },
  { id: 'home-4', name: 'Cast Iron Skillet, 10"', price: 32.5, category: 'Home & Living', image: image('1606374894242-19110fdbd56c'), description: 'Pre-seasoned cast iron skillet built to last generations.', stock: 25, rating: 4.9, reviewCount: 340 },
  { id: 'sports-1', name: 'Yoga Mat with Carry Strap', price: 28.0, category: 'Sports', image: image('1646239646963-b0b9be56d6b5'), description: 'Extra-thick non-slip mat with a lightweight strap for on-the-go studios.', stock: 50, rating: 4.5, reviewCount: 210 },
  { id: 'sports-2', name: 'Adjustable Dumbbell Set', price: 149.0, compareAtPrice: 189.0, category: 'Sports', image: image('1638536532686-d610adfc8e5c'), description: 'Space-saving dumbbells that adjust from 5 to 25 lbs per hand.', stock: 10, rating: 4.8, reviewCount: 158 },
  { id: 'sports-3', name: 'Insulated Sports Water Bottle', price: 24.0, category: 'Sports', image: image('1683383277379-644816d886e2'), description: 'Keeps drinks cold for 24 hours with a leak-proof, one-hand-open lid.', stock: 55, rating: 4.6, reviewCount: 267, isNew: true },
  { id: 'sports-4', name: 'Trail Running Backpack, 10L', price: 58.0, category: 'Sports', image: image('1724280985069-1f7ba60ab80d'), description: 'Lightweight hydration-ready pack built for long trail runs.', stock: 16, rating: 4.3, reviewCount: 54 },
]

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id)
}
