import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "The Royal Gurkha Pant - Onyx",
    price: 8999,
    originalPrice: 10999,
    image: "https://picsum.photos/seed/gurkha1/800/1000",
    slug: "royal-gurkha-onyx",
    tag: "Bestseller",
    size: ["28", "30", "32", "34", "36", "38"],
    fabric: "Premium Cotton Linen Blend",
    colors: ["Black", "Navy", "Beige"],
    category: "modern",
    rating: 4.8,
    reviews: 124,
    description: "Experience the pinnacle of comfort and style with our Royal Gurkha Pants. Featuring a high-waisted double-pleated design and signature side adjusters.",
    features: ["Double Pleated Front", "Signature Side Adjusters", "Extended Waistband", "Tapered Fit"]
  },
  {
    id: 2,
    title: "Classic Ivory Pleated Trouser",
    price: 7499,
    originalPrice: 8999,
    image: "https://picsum.photos/seed/pant2/800/1000",
    slug: "classic-ivory-pleated",
    size: ["30", "32", "34", "36"],
    fabric: "Italian Wool Blend",
    colors: ["Ivory", "Grey"],
    category: "classic",
    rating: 4.5,
    reviews: 89,
    description: "A timeless classic reimagined for the modern gentleman. These trousers offer a relaxed yet tailored silhouette perfect for semi-formal occasions.",
    features: ["Single Pleat", "Hidden Coin Pocket", "Sustainable Fabric"]
  },
  {
    id: 3,
    title: "Midnight Silk Ceremonial Shirt",
    price: 12999,
    image: "https://picsum.photos/seed/shirt1/800/1000",
    slug: "midnight-silk-shirt",
    tag: "New Arrival",
    size: ["S", "M", "L", "XL", "XXL"],
    fabric: "100% Raw Silk",
    colors: ["Midnight Blue", "Maroon"],
    category: "shirt",
    rating: 4.9,
    reviews: 42,
    description: "Crafted from the finest raw silk, this ceremonial shirt exudes luxury. Perfect for weddings and gala events.",
    features: ["Mandarin Collar", "Hidden Placket", "Mother of Pearl Buttons"]
  },
  {
    id: 4,
    title: "Heritage Jodhpuri Breeches",
    price: 9999,
    originalPrice: 11500,
    image: "https://picsum.photos/seed/jodhpuri/800/1000",
    slug: "heritage-jodhpuri",
    size: ["30", "32", "34", "36"],
    fabric: "Stretch Cotton",
    colors: ["Sand", "Olive", "Black"],
    category: "classic",
    rating: 4.7,
    reviews: 56,
    description: "Bringing back the equestrian heritage with modern comfort. These breeches are designed for those who appreciate history.",
    features: ["Reinforced Inner Leg", "Buttoned Calves", "High Rise"]
  },
  {
    id: 5,
    title: "Velvet Tuxedo Shirt",
    price: 14999,
    image: "https://picsum.photos/seed/velvet/800/1000",
    slug: "velvet-tuxedo-shirt",
    tag: "Limited Edition",
    size: ["M", "L", "XL"],
    fabric: "Premium Velvet",
    colors: ["Emerald", "Burgundy"],
    category: "shirt",
    rating: 5.0,
    reviews: 12,
    description: "Make a statement with our Velvet Tuxedo Shirt. Soft to the touch and visually striking.",
    features: ["French Cuffs", "Wing Tip Collar", "Slim Fit"]
  },
  {
    id: 6,
    title: "Modern Wedding Sherwani Set",
    price: 45999,
    originalPrice: 55000,
    image: "https://picsum.photos/seed/sherwani/800/1000",
    slug: "modern-sherwani",
    size: ["36", "38", "40", "42"],
    fabric: "Brocade Silk",
    colors: ["Gold", "Cream"],
    category: "wedding",
    rating: 4.9,
    reviews: 28,
    description: "The ultimate wedding attire. This Sherwani set features intricate hand embroidery and comes with a matching stole.",
    features: ["Hand Embroidered", "Matching Stole Included", "Custom Fit Available"]
  }
];

export const CATEGORIES = [
  { id: 'modern', name: 'Modern Pants', image: 'https://picsum.photos/seed/cat1/600/400' },
  { id: 'classic', name: 'Classic Trousers', image: 'https://picsum.photos/seed/cat2/600/400' },
  { id: 'shirt', name: 'Premium Shirts', image: 'https://picsum.photos/seed/cat3/600/400' },
  { id: 'wedding', name: 'Wedding Closet', image: 'https://picsum.photos/seed/cat4/600/400' }
];