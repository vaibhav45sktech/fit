export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  slug: string;
  tag?: string;
  size: string[];
  fabric: string;
  colors: string[];
  category: "modern" | "classic" | "shirt" | "wedding";
  description?: string;
  features?: string[];
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  selectedFit: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Review {
  id: string;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}