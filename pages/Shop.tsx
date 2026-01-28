import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data';
import { Filter } from 'lucide-react';

const Shop: React.FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const categoryParam = query.get('category');
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  
  useEffect(() => {
    setActiveCategory(categoryParam || 'all');
  }, [categoryParam]);

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-serif capitalize">{activeCategory === 'all' ? 'All Collection' : `${activeCategory} Collection`}</h1>
           <p className="text-gray-400 text-sm mt-1">{filteredProducts.length} Products Found</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-surface px-4 py-2 border border-gray-800 rounded-lg cursor-pointer hover:border-amber-500 transition-colors">
              <Filter size={16} />
              <span className="text-sm">Filter</span>
           </div>
           <select 
             className="bg-surface border border-gray-800 text-white text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2.5 outline-none"
             value={activeCategory}
             onChange={(e) => setActiveCategory(e.target.value)}
           >
             <option value="all">All Categories</option>
             <option value="modern">Modern Pants</option>
             <option value="classic">Classic Trousers</option>
             <option value="shirt">Shirts</option>
             <option value="wedding">Wedding</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;