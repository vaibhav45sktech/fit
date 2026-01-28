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
    title: "Black Timeless Shirt",
    price: 800,
    originalPrice: 1200,
    image: "",
    slug: "black-timeless-shirt",
    tag: "Premium",
    size: ["S", "M", "L", "XL", "XXL", "3XL"],
    fabric: "Premium Wrinkle-Free Lachka Fabric",
    colors: ["Black"],
    category: "shirt",
    rating: 4.9,
    reviews: 54,
    description: "Crafted from our Premium Wrinkle-Free Lachka Fabric, this shirt is designed for a crisp, polished look that lasts all day. The wrinkle-free fabric ensures minimal ironing, while the breathable construction keeps you comfortable in every season.",
    features: [
      "Premium wrinkle-free Lachka Fabric",
      "Smooth finish with a clean drape",
      "Easy-care, low maintenance fabric",
      "Suitable for all-day wear"
    ]
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
  { id: 'shirt', name: 'Premium Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2070&auto=format&fit=crop' },
  { id: 'wedding', name: 'Wedding Closet', image: 'https://picsum.photos/seed/cat4/600/400' }
];