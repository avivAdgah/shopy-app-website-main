export const CATEGORIES = ['Electronics', 'Fashion', 'Home & Living', 'Sports']

const image = (seed) => `https://picsum.photos/seed/${seed}/600/600`

export const PRODUCTS = [
  { id: 'elec-1', name: 'Wireless Over-Ear Headphones', price: 89.99, category: 'Electronics', image: image('headphones-1'), description: 'Noise-isolating wireless headphones with 30-hour battery life and plush ear cushions for all-day comfort.', stock: 24 },
  { id: 'elec-2', name: 'Smart Fitness Watch', price: 129.0, category: 'Electronics', image: image('watch-1'), description: 'Track heart rate, sleep, and workouts with a bright always-on display and 7-day battery.', stock: 15 },
  { id: 'elec-3', name: 'Portable Bluetooth Speaker', price: 49.5, category: 'Electronics', image: image('speaker-1'), description: 'Compact speaker with rich bass, IPX6 water resistance, and 12-hour playtime.', stock: 40 },
  { id: 'elec-4', name: 'Mechanical Keyboard', price: 74.0, category: 'Electronics', image: image('keyboard-1'), description: 'Tactile mechanical switches with per-key RGB lighting and a durable aluminum frame.', stock: 18 },
  { id: 'elec-5', name: 'USB-C Fast Charger, 65W', price: 29.99, category: 'Electronics', image: image('charger-1'), description: 'Compact GaN charger that fuels a laptop and phone at the same time.', stock: 60 },
  { id: 'fashion-1', name: 'Classic Denim Jacket', price: 64.0, category: 'Fashion', image: image('jacket-1'), description: 'Timeless denim jacket with a relaxed fit, built from heavyweight cotton.', stock: 22 },
  { id: 'fashion-2', name: 'Everyday Canvas Sneakers', price: 55.0, category: 'Fashion', image: image('sneakers-1'), description: 'Lightweight canvas sneakers with a cushioned sole, made for daily wear.', stock: 30 },
  { id: 'fashion-3', name: 'Merino Wool Sweater', price: 78.5, category: 'Fashion', image: image('sweater-1'), description: 'Soft, breathable merino wool sweater that keeps you warm without the bulk.', stock: 12 },
  { id: 'fashion-4', name: 'Minimalist Leather Wallet', price: 34.0, category: 'Fashion', image: image('wallet-1'), description: 'Slim bifold wallet in full-grain leather with six card slots.', stock: 45 },
  { id: 'home-1', name: 'Ceramic Pour-Over Coffee Set', price: 42.0, category: 'Home & Living', image: image('coffee-1'), description: 'Hand-glazed ceramic dripper and carafe for a smoother, richer cup.', stock: 20 },
  { id: 'home-2', name: 'Linen Throw Blanket', price: 38.0, category: 'Home & Living', image: image('blanket-1'), description: 'Pre-washed linen blanket that softens with every wash, perfect for any season.', stock: 27 },
  { id: 'home-3', name: 'Aroma Diffuser & Humidifier', price: 45.99, category: 'Home & Living', image: image('diffuser-1'), description: 'Whisper-quiet ultrasonic diffuser with color-changing ambient light.', stock: 33 },
  { id: 'home-4', name: 'Cast Iron Skillet, 10"', price: 32.5, category: 'Home & Living', image: image('skillet-1'), description: 'Pre-seasoned cast iron skillet built to last generations.', stock: 25 },
  { id: 'sports-1', name: 'Yoga Mat with Carry Strap', price: 28.0, category: 'Sports', image: image('yoga-1'), description: 'Extra-thick non-slip mat with a lightweight strap for on-the-go studios.', stock: 50 },
  { id: 'sports-2', name: 'Adjustable Dumbbell Set', price: 149.0, category: 'Sports', image: image('dumbbell-1'), description: 'Space-saving dumbbells that adjust from 5 to 25 lbs per hand.', stock: 10 },
  { id: 'sports-3', name: 'Insulated Sports Water Bottle', price: 24.0, category: 'Sports', image: image('bottle-1'), description: 'Keeps drinks cold for 24 hours with a leak-proof, one-hand-open lid.', stock: 55 },
  { id: 'sports-4', name: 'Trail Running Backpack, 10L', price: 58.0, category: 'Sports', image: image('backpack-1'), description: 'Lightweight hydration-ready pack built for long trail runs.', stock: 16 },
]

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id)
}
