import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Ruler, Minus, Plus, Heart } from 'lucide-react';
import { PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product?.size[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [qty, setQty] = useState(1);

  if (!product) return <div className="pt-32 text-center">Product not found</div>;

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Images */}
        <div className="space-y-4">
           <div className="aspect-[3/4] bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
             <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
           </div>
           <div className="grid grid-cols-4 gap-4">
              {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-square bg-gray-900 rounded border border-gray-800 cursor-pointer hover:border-amber-500">
                    <img src={product.image} alt="thumbnail" className="w-full h-full object-cover opacity-70 hover:opacity-100" />
                  </div>
              ))}
           </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-8">
           <div>
              <h1 className="text-3xl md:text-4xl font-serif mb-2">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                 <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />)}
                 </div>
                 <span className="text-sm text-gray-500">({product.reviews} Reviews)</span>
              </div>
              <div className="flex items-baseline gap-4">
                 <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
                 {product.originalPrice && <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>}
                 {product.originalPrice && (
                    <span className="text-amber-500 text-sm font-bold bg-amber-500/10 px-2 py-1 rounded">
                       {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                 )}
              </div>
              <p className="text-xs text-gray-500 mt-2">Inclusive of all taxes</p>
           </div>

           <div className="h-px bg-gray-800" />

           <p className="text-gray-300 leading-relaxed">{product.description}</p>

           <div className="space-y-4">
              <div>
                 <span className="block text-sm font-bold mb-2 uppercase text-gray-400">Color: <span className="text-white">{selectedColor}</span></span>
                 <div className="flex gap-3">
                    {product.colors.map(color => (
                        <button
                          key={color} 
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-amber-500' : 'border-transparent'}`}
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                    ))}
                 </div>
              </div>

              <div>
                 <div className="flex justify-between items-center mb-2">
                    <span className="block text-sm font-bold uppercase text-gray-400">Size: <span className="text-white">{selectedSize}</span></span>
                    <button className="text-amber-500 text-xs flex items-center gap-1 hover:underline"><Ruler size={14} /> Size Guide</button>
                 </div>
                 <div className="flex flex-wrap gap-3">
                    {product.size.map(size => (
                        <button
                          key={size} 
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-10 flex items-center justify-center border rounded-md transition-all ${selectedSize === size ? 'bg-amber-500 text-black border-amber-500 font-bold' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                        >
                           {size}
                        </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="flex gap-4 pt-4">
               <button 
                 onClick={() => addToCart(product, selectedSize, selectedColor)}
                 className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold py-4 rounded-xl hover:from-amber-500 hover:to-amber-400 transition-all uppercase tracking-wider shadow-lg shadow-amber-500/20"
               >
                  Add to Cart
               </button>
               <button 
                 onClick={() => toggleWishlist(product)}
                 className={`w-14 flex items-center justify-center border rounded-xl transition-all ${isWishlisted ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-gray-700 hover:border-amber-500 hover:text-amber-500'}`}
               >
                  <Heart fill={isWishlisted ? "currentColor" : "none"} />
               </button>
           </div>

           <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 pt-4">
              <div className="flex items-center gap-2">
                 <Truck size={16} className="text-amber-500" />
                 <span>Free Shipping above ₹4999</span>
              </div>
              <div className="flex items-center gap-2">
                 <ShieldCheck size={16} className="text-amber-500" />
                 <span>100% Authentic Products</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;