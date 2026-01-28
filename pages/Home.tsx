import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);
  const bestSellers = PRODUCTS.filter(p => p.tag === 'Bestseller').slice(0, 4);

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Featured Collection */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">New Arrivals</h2>
            <div className="h-1 w-20 bg-amber-500"></div>
          </div>
          <a href="/shop" className="text-amber-500 hover:text-white transition-colors text-sm uppercase tracking-wider font-bold">View All</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI Promo Section */}
      <section className="py-20 bg-surface border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <span className="text-amber-500 tracking-widest uppercase text-sm font-bold">FITTARA AI</span>
                <h2 className="text-4xl md:text-5xl font-serif text-white">Design Your Own Legacy</h2>
                <p className="text-gray-400 text-lg">
                    Unleash your creativity with our AI Design Lab. Generate custom patterns, consult with our AI stylist, or visualize your designs on a virtual runway.
                </p>
                <a href="/design-lab" className="inline-block px-8 py-3 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all font-bold uppercase tracking-wider">
                    Try Design Lab
                </a>
            </div>
            <div className="relative h-96 bg-black rounded-lg overflow-hidden border border-gray-700 group">
                <img src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=2148&auto=format&fit=crop" alt="AI Design" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Curated For You</h2>
          <p className="text-gray-400">Handpicked selections for the discerning gentleman.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.length > 0 ? bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          )) : featuredProducts.map(product => (
            <ProductCard key={`bs-${product.id}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;