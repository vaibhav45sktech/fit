import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
        <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
           <div className="bg-surface p-6 rounded-full mb-6">
              <Heart size={48} className="text-gray-600" />
           </div>
           <h2 className="text-2xl font-serif mb-2">Your Wishlist is Empty</h2>
           <p className="text-gray-400 mb-8">Save items you love to buy later.</p>
           <Link to="/shop" className="px-8 py-3 bg-amber-600 text-black font-bold rounded-lg hover:bg-amber-500 transition-colors">Explore Collection</Link>
        </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-serif mb-8 border-b border-gray-800 pb-4">My Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;