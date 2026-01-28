import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, ImageOff } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative bg-surface border border-gray-800 hover:border-amber-500/30 transition-all duration-300 overflow-hidden">
      {/* Badge */}
      {product.tag && (
        <span className="absolute top-3 left-3 z-10 bg-amber-600 text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
          {product.tag}
        </span>
      )}

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
        {product.image ? (
            <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
        ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                <ImageOff size={32} className="mb-2 opacity-50" />
                <span className="text-xs">No Image</span>
            </div>
        )}
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
           <button 
             onClick={(e) => { e.preventDefault(); addToCart(product, product.size[0], product.colors[0], "Regular Fit"); }}
             className="p-3 bg-white text-black rounded-full hover:bg-amber-500 hover:text-white transition-colors transform hover:scale-110"
             title="Quick Add"
           >
             <ShoppingBag size={20} />
           </button>
           <Link to={`/product/${product.id}`} className="p-3 bg-white text-black rounded-full hover:bg-amber-500 hover:text-white transition-colors transform hover:scale-110">
             <Eye size={20} />
           </Link>
           <button 
             onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
             className={`p-3 rounded-full transition-colors transform hover:scale-110 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-red-500 hover:text-white'}`}
           >
             <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
           </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-medium text-white truncate group-hover:text-amber-500 transition-colors">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-white font-bold">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="flex items-center text-amber-500 text-xs">
            <span>★</span> <span className="ml-1 text-gray-400">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;