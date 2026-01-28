import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, User as UserIcon, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { user, signIn, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="fixed w-full z-50">
      {/* Announcement Bar */}
      <div className="bg-amber-600 text-black text-xs font-bold py-1 text-center tracking-widest uppercase">
        FESTIVE SALE LIVE | Use Code: FESTIVE20
      </div>

      {/* Main Nav */}
      <nav className="glass-panel text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
              <h1 className="font-serif text-3xl tracking-widest text-white">
                FITTARA
                <span className="text-amber-500 text-4xl">.</span>
              </h1>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/shop?category=modern" className="hover:text-amber-500 transition-colors duration-300 text-sm tracking-wider uppercase">Pants</Link>
                <Link to="/shop?category=shirt" className="hover:text-amber-500 transition-colors duration-300 text-sm tracking-wider uppercase">Shirts</Link>
                <Link to="/shop?category=wedding" className="hover:text-amber-500 transition-colors duration-300 text-sm tracking-wider uppercase">Wedding</Link>
                <Link to="/design-lab" className="flex items-center gap-1 text-amber-500 hover:text-amber-400 transition-colors duration-300 text-sm tracking-wider uppercase font-bold">
                  <Sparkles size={14} /> AI Studio
                </Link>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6">
              <div className="hidden md:block relative group">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-b border-gray-600 focus:border-amber-500 outline-none text-sm w-32 focus:w-48 transition-all duration-300 placeholder-gray-500"
                />
                <Search className="absolute right-0 top-1 text-gray-500" size={16} />
              </div>

              <Link to="/wishlist" className="relative text-gray-300 hover:text-amber-500 transition-colors">
                <Heart size={22} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative text-gray-300 hover:text-amber-500 transition-colors">
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="relative group">
                {user ? (
                   <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/account')}>
                     {user.avatar ? (
                       <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-amber-500" />
                     ) : (
                       <UserIcon size={22} className="text-amber-500" />
                     )}
                   </div>
                ) : (
                  <button onClick={signIn} className="text-sm font-semibold hover:text-amber-500 uppercase">Login</button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-surface border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/shop?category=modern" className="block px-3 py-2 text-base font-medium hover:text-amber-500">Pants</Link>
              <Link to="/shop?category=shirt" className="block px-3 py-2 text-base font-medium hover:text-amber-500">Shirts</Link>
              <Link to="/shop?category=wedding" className="block px-3 py-2 text-base font-medium hover:text-amber-500">Wedding Closet</Link>
              <Link to="/design-lab" className="block px-3 py-2 text-base font-medium text-amber-500">AI Design Studio</Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;